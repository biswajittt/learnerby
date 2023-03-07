import { React, useState } from 'react'
import { Box, Button, Dialog, TextField, Autocomplete, Typography, styled, FormControl, InputLabel, Select, MenuItem, Chip, OutlinedInput, useTheme, Input, Avatar, MobileStepper, Stack } from "@mui/material";
import { authenticateMentorRegistration, authenticateMentorLogin } from '../../service/api';
import { useDispatch } from 'react-redux';
import { mentorInfoAfterRegistration } from '../../redux/actions/mentorInfoAfterRegistration';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


import mentorloginbg from "./mentorloginbg.png"

const _ = require("lodash")

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },]

const Component = styled(Box)`
height: 91vh;
width: 89vh;
`;
const LeftContainer = styled(Box)`
background: #424242;

width: 30%;
padding: 43.4px 35px;
&>h5, &>span{
    color: #FFFFFF;
    font-weight: 600;
}
`;
const TermsConditionText = styled(Typography)`
font-size:12px;
`;
const RightContainer = styled(Box)`
display: flex;
flex-direction: column;
padding: 25px 35px;
flex: 1;
&>div, &>button, &>p{
    margin-top: 20px;
`;

const LoginButton = styled(Button)`
text-transform: none;
background: black;
color: white;
height: 43px;
border-radius: 21px;
`;
const LoginButtonInRegistrationContainer = styled(Button)`
text-transform: none;
background: #fff;
color: black;
height: 43px;
border-radius: 9px;
box-shadow: 1px 2px 11px 2px rgb(0 0 0 / 20%);
margin-top: 15px;
`;
const CreateAccountText = styled(Typography)`
font-size: 14px;
text-align: center;
cursor: pointer;
`;

const Error = styled(Typography)`
font-size: 10px;
color: #ff6361;
line-height: 0;
margin-top: 10px;
font-weight: bold;
`;

const accountInitialValue = {
    login: {
        view: "login",
        heading: "Login",
        subHeading: "Get access to our features"
    },
    registration: {
        view: "registration",
        heading: "Welcome!, Create an mentor account",
        subHeading: "Register with email to became a mentor"
    }
}

const initialRegistrationValue = {
    profileimage: {},
    name: '',
    email: '',
    phonenumber: '',
    address: '',
    title: '',
    aboutme: '',
    interest: [],
    mode: '',
    priceperhour: '',
    priceperday: '',
    password: ''
}

const initialLoginValue = {
    email: '',
    password: ''
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const subjectNames = [
    'Physics',
    'Chemistry',
    'Mathematics',
    'History',
    'ReactJs',
    'Java',
    'JavaScript',
    'Web Development',
    'Android Apps Development',
    'C++',
    'Others'
];

export default function MentorLoginDialog(props) {

    const [account, setToggleAccount] = useState(accountInitialValue.login);

    const [registrationData, setRegistrationData] = useState(initialRegistrationValue);
    const [loginData, setLoginData] = useState(initialLoginValue);
    const [error, setError] = useState(false);

    // const [ac, setAccount] = useState(DataContext);

    const toggleRegistration = () => {
        setToggleAccount(accountInitialValue.registration)
    }

    const toggleLogin = () => {
        setToggleAccount(accountInitialValue.login)
    }

    const handleClose = () => {
        props.setMentorLoginDialog(false);
        setToggleAccount(accountInitialValue.login);
        setError(false);
    }

    const theme = useTheme();
    const [subjectName, setSubjectName] = useState([]);

    //
    const [mentorProfileImage, setMentorProfileImage] = useState("");
    const [mentorProfileImageUrl, setMentorProfileImageUrl] = useState();
    const [disabled, setDisabled] = useState(true);
    // setMentorProfileImageUrl(CloudUploadIcon)
    //

    const onSubjectChange = (event, values) => {
        setSubjectName(
            values
        );
        // let skills = _.mapValues(values, _.method('toLowerCase'))
        // console.log(skills)
        setRegistrationData({ ...registrationData, ['interest']: values })
    };

    const onInputChangeOnLogin = (event) => {
        setLoginData({ ...loginData, [event.target.name]: event.target.value })
        console.log(loginData)
    }

    const onInputChangeOnRegistration = (event) => {
        setRegistrationData({ ...registrationData, [event.target.name]: event.target.value })
        console.log(registrationData)
        if (!registrationData.name || !registrationData.email || !registrationData.phonenumber || !registrationData.address || !registrationData.interest || !registrationData.mode || !registrationData.priceperday || !registrationData.priceperhour || !registrationData.password || !registrationData.profileimage) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }

    const dispatch = useDispatch();

    const handleOnChangeProfileImage = (event) => {
        // console.log(event.target.files)
        setMentorProfileImage(event.target.files[0])
        setMentorProfileImageUrl(URL.createObjectURL(event.target.files[0]))
        // console.log(mentorProfileImageUrl)
        // const profileImageData = new FormData();
        // profileImageData.append("file", mentorProfileImage);
        // profileImageData.append("upload_preset", "profile_image");
        // // profileImageData.append("cloud_name", "dw5trjq2s");
        // axios.post("https://api.cloudinary.com/v1_1/dw5trjq2s/image/upload", profileImageData)
        //     .then((response) => {
        //         console.log(response)
        //         console.log(response.data["secure_url"])
        //     })
    }
    const registerMentor = async () => {

        // let interest = _.mapValues(registrationData["interest"], _.method('toLowerCase'))
        // registrationData.interest = Object.entries(interest).map(([name, obj]) => ({ obj }))
        console.log(registrationData)
        const profileImageData = new FormData();
        profileImageData.append("file", mentorProfileImage);
        profileImageData.append("upload_preset", "profile_image");
        // profileImageData.append("cloud_name", "dw5trjq2s");
        axios.post("https://api.cloudinary.com/v1_1/dw5trjq2s/image/upload", profileImageData)
            .then(async (result) => {
                // setMentorProfileImageUrl(result.data["secure_url"])
                console.log(result)
                const public_id = result.data["public_id"];
                const url = result.data["secure_url"];
                registrationData.profileimage = {
                    public_id,
                    url
                }
                console.log(registrationData)
                let response = await authenticateMentorRegistration(registrationData);
                if (response.status === 200) {
                    console.log(response.data.data)
                    // localStorage.setItem('learnerbyauthtoken', response.data.data.token)
                    localStorage.setItem('accountHolderData', JSON.stringify(response.data.data))
                    // console.log(response.data.data.userLogin)
                    // localStorage.setItem('category', 'mentor')
                    // localStorage.setItem('category', 'mentor')
                    //
                    handleClose();
                    dispatch(mentorInfoAfterRegistration(response.data.data))
                } else {
                    console.log('error')
                    // setError(true);
                    // setLoginButton({ text: 'Login', isClicked: false, createAccountText: 'block' })
                }

            })
        // handleClose();
        // dispatch(mentorInfoAfterRegistration(registrationData));

    }

    const loginMentor = async () => {

        let response = await authenticateMentorLogin(loginData);
        if (response.status === 200) {
            console.log("hi response", response)
            // console.log("hi response", response.data.data.token)
            //
            // localStorage.setItem('learnerbyauthtoken', response.data.data.token)
            localStorage.setItem('accountHolderData', JSON.stringify(response.data.data))
            console.log(response.data.data)
            // localStorage.setItem('category', 'mentor')
            //
            handleClose();
            // dispatch(userInfoAfterLogin(response))
        } else {
            console.log('error')
            // setError(true);
            // setLoginButton({ text: 'Login', isClicked: false, createAccountText: 'block' })
        }
    }

    // //
    // const [image, setImg] = useState();
    // const inputFileRef = createRef();

    // // const cleanUp = () => {
    // //     URL.
    // // }
    // const setImage = (newImage) => {
    //     if (image) {
    //         console.log("delete img");
    //     }
    //     setImg(newImage);
    // }

    // const handleOnChange = (event) => {
    //     const newImage = event.target.files[0];
    //     console.log(newImage);
    //     if (newImage) {
    //         setImage(URL.createObjectURL(newImage));
    //     }
    //     imageUpload(event);
    // }
    //

    // const [backButtonClicked, setBackButtonClicked] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [changeNextTextOnButtontonClicked, setChangeNextTextOnButtontonClicked] = useState("Next");

    const handleBackButton = () => {
        setActiveStep(0)
    }
    const handleNextButton = () => {
        setActiveStep(1);
    }

    //

    return (
        <Dialog open={props.mentorLoginDialog} onClose={handleClose} PaperProps={{ sx: { maxWidth: "unset" } }}>
            <Component>
                <Box style={{ display: "flex", height: "100%" }}>
                    <LeftContainer>
                        <Typography variant='h5'>{account.heading}</Typography>
                        <Typography variant='h7' style={{ marginTop: "20px" }}>{account.subHeading}</Typography>
                        <img src={mentorloginbg} style={{ height: '206px', width: '206px', marginTop: '123px' }} alt="mentorloginbg" />
                    </LeftContainer>

                    {
                        account.view === "login" ?

                            <RightContainer>
                                <TextField variant='standard' name='email' onChange={(event) => { onInputChangeOnLogin(event) }} label='Enter Email/Phone Number' />

                                {error && <Error>Please enter valid username or password</Error>}

                                <TextField variant='standard' name='password' onChange={(event) => { onInputChangeOnLogin(event) }} label='Enter Password' />
                                <TermsConditionText>By continuing, you agree to Learnerby`s terms of use and privacy policy</TermsConditionText>
                                <LoginButton onClick={() => { loginMentor() }}>Login</LoginButton>
                                <CreateAccountText onClick={toggleRegistration}>New to Learnerby? Create an mentor account</CreateAccountText>
                            </RightContainer>
                            :

                            <RightContainer>

                                <label htmlFor='mentor-profile-avater' style={{ cursor: "pointer", marginLeft: "90px" }}>
                                    <Avatar
                                        sx={{ bgcolor: "grey", width: 60, height: 60, marginLeft: "40px" }}
                                        alt="Remy Sharp"
                                        src={mentorProfileImageUrl}
                                    >
                                        <CloudUploadIcon />
                                    </Avatar>
                                    <Typography sx={{ fontWeight: '600' }}>Upload your image</Typography>
                                </label>
                                {
                                    (activeStep == 0) ?

                                        <Stack spacing={2} sx={{ height: "440px" }}>
                                            <Input accept="image/*" hidden id="mentor-profile-avater" type="file" name='profileimage' onChange={handleOnChangeProfileImage} style={{ display: "none" }} />
                                            <TextField variant='standard' name='name' value={registrationData.name} onChange={(event) => { onInputChangeOnRegistration(event) }} label='Enter Name' />
                                            <TextField variant='standard' name='email' value={registrationData.email} onChange={(event) => { onInputChangeOnRegistration(event) }} label='Enter Email' />
                                            <TextField variant='standard' name='phonenumber' value={registrationData.phonenumber} onChange={(event) => { onInputChangeOnRegistration(event) }} label='Enter Phone Number' />
                                            <TextField variant='standard' name='address' value={registrationData.address} onChange={(event) => { onInputChangeOnRegistration(event) }} label='Enter Address' />
                                            {/* <FormControl sx={{ m: 1 }} variant='standard'>
                                                <InputLabel id="demo-multiple-chip-label">Enter Your Interests</InputLabel>
                                                <Select
                                                    labelId="demo-multiple-chip-label"
                                                    id="demo-multiple-chip"
                                                    multiple
                                                    name='interest'
                                                    defaultValue=''
                                                    label="Enter Your Interests"
                                                    value={personName}
                                                    onChange={handleChange}
                                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                                    renderValue={(selected) => (
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                            {selected.map((value) => (
                                                                <Chip key={value} label={value} />
                                                            ))}
                                                        </Box>
                                                    )}
                                                    MenuProps={MenuProps}
                                                >
                                                    {names.map((name) => (
                                                        <MenuItem
                                                            key={name}
                                                            value={name}
                                                            style={getStyles(name, personName, theme)}
                                                        >
                                                            {name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl> */}
                                            <TextField variant='standard' name='title' value={registrationData.title} onChange={(event) => { onInputChangeOnRegistration(event) }} label='Enter Title' />

                                        </Stack> :
                                        <Stack spacing={2} sx={{ height: "440px" }} >
                                            <TextField variant='standard' name='aboutme' onChange={(event) => { onInputChangeOnRegistration(event) }} label='About You' />
                                            <Autocomplete
                                                multiple
                                                limitTags={1}
                                                id="tags-standard"
                                                options={subjectNames}
                                                value={registrationData.interest}
                                                onChange={onSubjectChange}
                                                getOptionLabel={(option) => option}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        name='interest'
                                                        variant="standard"
                                                        label="Enter Your Interests"
                                                        placeholder="Skills"
                                                    />
                                                )}
                                            />
                                            <FormControl fullWidth variant='standard'>
                                                <InputLabel id="demo-simple-select-label">Enter Teaching Mode</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    name='mode'
                                                    value={registrationData.mode}
                                                    label="Enter Teaching Mode"
                                                    onChange={(event) => { onInputChangeOnRegistration(event) }}
                                                >
                                                    <MenuItem value="online">Online</MenuItem>
                                                    <MenuItem value="offline">Offline</MenuItem>
                                                    <MenuItem value="both">Both</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <TextField variant='standard' name='priceperhour' value={registrationData.priceperhour} onChange={(event) => { onInputChangeOnRegistration(event) }} label='Enter Price Per Hour' />
                                            <TextField variant='standard' name='priceperday' value={registrationData.priceperday} onChange={(event) => { onInputChangeOnRegistration(event) }} label='Enter Price Per Day' />
                                            <TextField variant='standard' name='password' value={registrationData.password} onChange={(event) => { onInputChangeOnRegistration(event) }} label='Enter Password' />
                                        </Stack>
                                }

                                <MobileStepper
                                    variant="progress"
                                    steps={2}
                                    position="fixed"
                                    activeStep={activeStep}
                                    sx={{ maxWidth: 400, marginTop: '25px', color: 'black' }}
                                    nextButton={
                                        (activeStep == 0) ?
                                            <Button onClick={handleNextButton} >
                                                Next
                                                {theme.direction === 'rtl' ? (
                                                    <KeyboardArrowLeft />
                                                ) : (
                                                    <KeyboardArrowRight />
                                                )}

                                            </Button> :
                                            <Button variant='filled' onClick={() => { registerMentor() }}
                                                sx={{ background: '#262626', color: 'white', borderRadius: '10px' }}>
                                                Continue</Button>
                                    }
                                    backButton={
                                        <Button size="small" onClick={handleBackButton} disabled={activeStep == 0}>
                                            {theme.direction === 'rtl' ? (
                                                <KeyboardArrowRight />
                                            ) : (
                                                <KeyboardArrowLeft />
                                            )}
                                            Back
                                        </Button>
                                    }
                                />
                                <Stack sx={{ marginTop: '115px' }}>
                                    <Typography style={{ textAlign: "center" }}>OR</Typography>
                                    <LoginButtonInRegistrationContainer onClick={toggleLogin}>
                                        <Typography sx={{ fontWeight: '600' }}>Login</Typography>
                                    </LoginButtonInRegistrationContainer>
                                </Stack>

                            </RightContainer>


                        // <RightContainer>
                        //     <label htmlFor='mentor-profile-avater' style={{ cursor: "pointer", marginLeft: "130px" }}>
                        //         <Avatar
                        //             sx={{ bgcolor: "grey", width: 60, height: 60 }}
                        //             alt="Remy Sharp"
                        //             src={mentorProfileImageUrl}
                        //         />
                        //     </label>
                        //     <Input accept="image/*" hidden id="mentor-profile-avater" type="file" name='profileimage' onChange={handleOnChangeProfileImage} style={{ display: "none" }} />

                        //     {/* <Button variant="contained" component="span" onClick={handleOnChange}>
                        //         Upload
                        //     </Button> */}
                        //     <TextField variant='standard' name='name' onChange={(event) => { onInputChangeOnRegistration(event) }} label='Enter Name' />
                        //     <TextField variant='standard' name='email' onChange={(event) => { onInputChangeOnRegistration(event) }} label='Enter Email' />
                        //     <TextField variant='standard' name='phonenumber' onChange={(event) => { onInputChangeOnRegistration(event) }} label='Enter Phone Number' />
                        //     <TextField variant='standard' name='address' onChange={(event) => { onInputChangeOnRegistration(event) }} label='Enter Address' />
                        //     <FormControl sx={{ m: 1 }} variant='standard'>
                        //         <InputLabel id="demo-multiple-chip-label">Enter Your Interests</InputLabel>
                        //         <Select
                        //             labelId="demo-multiple-chip-label"
                        //             id="demo-multiple-chip"
                        //             multiple
                        //             name='interest'
                        //             defaultValue=''
                        //             label="Enter Your Interests"
                        //             value={personName}
                        //             onChange={handleChange}
                        //             input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        //             renderValue={(selected) => (
                        //                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        //                     {selected.map((value) => (
                        //                         <Chip key={value} label={value} />
                        //                     ))}
                        //                 </Box>
                        //             )}
                        //             MenuProps={MenuProps}
                        //         >
                        //             {names.map((name) => (
                        //                 <MenuItem
                        //                     key={name}
                        //                     value={name}
                        //                     style={getStyles(name, personName, theme)}
                        //                 >
                        //                     {name}
                        //                 </MenuItem>
                        //             ))}
                        //         </Select>
                        //     </FormControl>
                        //     {/* <TextField variant='standard' name='interest' onChange={(event) => { onInputChangeOnRegistration(event) }} label='Enter Subjects' /> */}

                        //     {/* <FormControl fullWidth variant='standard'>
                        //         <InputLabel id="demo-simple-select-label">Enter Teaching Mode</InputLabel>
                        //         <Select
                        //             labelId="demo-simple-select-label"
                        //             id="demo-simple-select"
                        //             name='mode'
                        //             defaultValue=""
                        //             label="Enter Teaching Mode"
                        //             onChange={(event) => { onInputChangeOnRegistration(event) }}
                        //         >
                        //             <MenuItem value="online">Online</MenuItem>
                        //             <MenuItem value="offline">Offline</MenuItem>
                        //             <MenuItem value="both">Both</MenuItem>
                        //         </Select>
                        //     </FormControl>
                        //     <TextField variant='standard' name='priceperhour' onChange={(event) => { onInputChangeOnRegistration(event) }} label='Enter Price Per Hour' />
                        //     <TextField variant='standard' name='priceperday' onChange={(event) => { onInputChangeOnRegistration(event) }} label='Enter Price Per Day' />
                        //     <TextField variant='standard' name='password' onChange={(event) => { onInputChangeOnRegistration(event) }} label='Enter Password' /> */}
                        //     <Stack direction='row' spacing={25}>
                        //         <Button>Back</Button>
                        //         <Button>Next</Button>
                        //     </Stack>
                        //     {/* <LoginButton onClick={() => { registerMentor() }}>Continue</LoginButton>
                        //     <Typography style={{ textAlign: "center" }}>OR</Typography>
                        //     <LoginButtonInRegistrationContainer onClick={toggleLogin}>Login</LoginButtonInRegistrationContainer> */}

                        // </RightContainer>
                    }
                </Box>
            </Component>
        </Dialog>
    )
}

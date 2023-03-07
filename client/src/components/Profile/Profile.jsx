import { Paper, Stack, Box, styled, Typography, TextField, Button, Skeleton, Avatar, Autocomplete, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useEffect } from 'react'
import image from '../Profile/mentor.jpg'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { updateUserProfile } from '../../service/api';

import { useNavigate } from 'react-router-dom';

const ProfileComponent = styled(Box)`
margin: 73px 12px 15px 12px;
margin-top: 115px;
`
const Container = styled(Stack)`

`
const FirstContainer = styled(Stack)`

`
const ContainerData = styled(Stack)`
display: flex;
align-items: center;
justify-content: center;
`
const ContainerInputData = styled(Stack)(({ theme }) => ({
    alignItems: 'center',
    marginTop: '30px',
    // marginLeft: '40px',
    // [theme.breakpoints.down(1300)]: {
    //     marginLeft: '48px',
    // },
    // [theme.breakpoints.down('md')]: {
    //     // marginLeft: '160px',
    //     marginTop: '30px'
    // },
    // [theme.breakpoints.down(886)]: {
    //     marginLeft: '146px',
    // },
    // [theme.breakpoints.down(850)]: {
    //     marginLeft: '125px',
    // },
    // [theme.breakpoints.down(803)]: {
    //     marginLeft: '105px',
    // },
    // [theme.breakpoints.down(775)]: {
    //     marginLeft: '85px',
    // },
    // [theme.breakpoints.down(720)]: {
    //     marginLeft: '71px',
    // },
    // [theme.breakpoints.down(693)]: {
    //     marginLeft: '46px',
    // },
    // [theme.breakpoints.down(650)]: {
    //     marginLeft: '33px',
    // },
    // [theme.breakpoints.down(600)]: {
    //     marginLeft: '22px',
    // },
}));

const SecondContainer = styled(Stack)`

`

const UserProfileCard = styled(Paper)(({ theme }) => ({
    width: '1083px',
    padding: '29px 150px 35px 150px',
    [theme.breakpoints.down(1285)]: {
        padding: '29px 130px 35px 130px',
    },
    [theme.breakpoints.down(1260)]: {
        padding: '29px 100px 35px 100px',
    },
    [theme.breakpoints.down(1180)]: {
        padding: '29px 80px 35px 80px',
    },
    [theme.breakpoints.down(1500)]: {
        padding: '29px 50px 35px 50px',
    },
}));
const MentorProfileCard = styled(Paper)(({ theme }) => ({
    width: '1083px',
    padding: '29px 150px 35px 150px',
    [theme.breakpoints.down(1285)]: {
        padding: '29px 130px 35px 130px',
    },
    [theme.breakpoints.down(1260)]: {
        padding: '29px 100px 35px 100px',
    },
    [theme.breakpoints.down(1180)]: {
        padding: '29px 80px 35px 80px',
    },
    [theme.breakpoints.down(1500)]: {
        padding: '29px 50px 35px 50px',
    },
}));

const LeftContainerStack = styled(Stack)(({ theme }) => ({
    marginRight: '170px',
    [theme.breakpoints.down(1300)]: {
        marginRight: '280px',
    },
    [theme.breakpoints.down(1075)]: {
        marginRight: '140px',
    },
    // [theme.breakpoints.down(900)]: {
    //     marginRight: '85px',
    // },
    [theme.breakpoints.down(940)]: {
        marginRight: '58px',
    },
    [theme.breakpoints.down('md')]: {
        marginRight: '0',
    },
}));
const LeftContainerTitleStack = styled(Stack)(({ theme }) => ({
    // marginLeft: '400px',
    // [theme.breakpoints.down(1300)]: {
    //     marginLeft: '280px',
    // }
}));
const LeftContainerInputStack = styled(Stack)(({ theme }) => ({
    width: '250px',

    // marginLeft: '400px',
    // [theme.breakpoints.down(1300)]: {
    //     marginLeft: '280px',
    // }
    [theme.breakpoints.up('md')]: {
        marginLeft: '25px',
    },
    [theme.breakpoints.down('md')]: {
        width: '300px',
        marginLeft: '84px'
    },
}));
const RightContainerStack = styled(Stack)(({ theme }) => ({
    // marginLeft: '400px',
    [theme.breakpoints.down('md')]: {
        marginTop: '30px'
    },
}));
const RightContainerTitleStack = styled(Stack)(({ theme }) => ({
    // marginLeft: '400px',

}));
const RightContainerInputStack = styled(Stack)(({ theme }) => ({
    width: '250px',
    [theme.breakpoints.down('md')]: {
        width: '300px'
    },
}));

const initialUserProfileValue = {
    id: '',
    name: '',
    email: '',
    phonenumber: '',
    address: '',
}

export default function Profile(props) {

    const navigate = useNavigate();

    const [clickedEdit, setClickedEdit] = useState(true)

    const [userProfileData, setUserProfileData] = useState(initialUserProfileValue);

    const editUserProfile = () => {
        setClickedEdit(false)
    }

    const onInputChangeOnEditUserData = (event) => {
        setUserProfileData({ ...userProfileData, [event.target.name]: event.target.value })
        console.log(userProfileData)
    }

    // useEffect(() => {
    //     const category = localStorage.getItem('category');
    // }, [])
    // const userData = useSelector((state) => state.userInfo)
    // console.log("from profile", userData)
    // let accountHolderProfileData = null;
    // if (userData.length > 0) {
    //     accountHolderProfileData = userData[0].data.data.userLogin
    // }
    const retrievedData = localStorage.getItem('accountHolderData')

    const accountHolderProfileData = JSON.parse(retrievedData)
    const category = localStorage.getItem('category')

    console.log("from profile", accountHolderProfileData)
    // let accountHolderProfileData = null;
    // if (userData.length > 0) {
    //     accountHolderProfileData = userData[0].data.data.userLogin
    // }

    // console.log("from profile", accountHolderProfileData)

    const updateUserProfileData = async () => {
        console.log('form proflie')
        setClickedEdit(true);
        // const localStorageData = localStorage.getItem('accountHolderData')
        // console.log(accountHolderProfileData._id)
        // const tempData = localStorage.getItem("accountHolderData")
        userProfileData.id = accountHolderProfileData._id;
        if (userProfileData.name == '') {
            userProfileData.name = accountHolderProfileData.name;
        }
        if (userProfileData.email == '') {
            userProfileData.email = accountHolderProfileData.email;
        }
        if (userProfileData.phonenumber == '') {
            userProfileData.phonenumber = accountHolderProfileData.phonenumber;
        }
        if (userProfileData.address == '') {
            userProfileData.address = accountHolderProfileData.address;
        }
        console.log(userProfileData)
        let response = await updateUserProfile(userProfileData);
        if (response.status === 200) {
            console.log("hi response", response.data.data)
            localStorage.removeItem("accountHolderData")
            localStorage.setItem("accountHolderData", JSON.stringify(response.data.data))
            navigate(`/profile/user/${response.data.data._id}`)

            // console.log("hi response", response.data.data.token)
            // localStorage.removeItem('accountHolderData');
            // localStorage.setItem('learnerbyauthtoken', response.data.data.token)
            // localStorage.setItem('accountHolderData', JSON.stringify(response.data.data.userLogin))
            // console.log(response.data.data.userLogin)
            // localStorage.setItem('category', 'user')
            //
            // handleClose();
            // dispatch(userInfoAfterLogin(response))

        } else {
            console.log('error')
            // setError(true);
            // setLoginButton({ text: 'Login', isClicked: false, createAccountText: 'block' })
        }
        // handleClose();
        // setAccount(registerUser.name);
        // console.log(loginData);
        // 

    }

    const updateMentorProfileData = async () => {
        console.log('form proflie')
        setClickedEdit(true);
        // const localStorageData = localStorage.getItem('accountHolderData')
        // console.log(accountHolderProfileData._id)
        // const tempData = localStorage.getItem("accountHolderData")
        // userProfileData.id = accountHolderProfileData._id;
        // if (userProfileData.name == '') {
        //     userProfileData.name = accountHolderProfileData.name;
        // }
        // if (userProfileData.email == '') {
        //     userProfileData.email = accountHolderProfileData.email;
        // }
        // if (userProfileData.phonenumber == '') {
        //     userProfileData.phonenumber = accountHolderProfileData.phonenumber;
        // }
        // if (userProfileData.address == '') {
        //     userProfileData.address = accountHolderProfileData.address;
        // }
        // console.log(userProfileData)
        let response = await updateUserProfile(userProfileData);
        if (response.status === 200) {
            console.log("hi response", response.data.data)
            localStorage.removeItem("accountHolderData")
            localStorage.setItem("accountHolderData", JSON.stringify(response.data.data))
            navigate(`/profile/user/${response.data.data._id}`)

            // console.log("hi response", response.data.data.token)
            // localStorage.removeItem('accountHolderData');
            // localStorage.setItem('learnerbyauthtoken', response.data.data.token)
            // localStorage.setItem('accountHolderData', JSON.stringify(response.data.data.userLogin))
            // console.log(response.data.data.userLogin)
            // localStorage.setItem('category', 'user')
            //
            // handleClose();
            // dispatch(userInfoAfterLogin(response))

        } else {
            console.log('error')
            // setError(true);
            // setLoginButton({ text: 'Login', isClicked: false, createAccountText: 'block' })
        }
        // handleClose();
        // setAccount(registerUser.name);
        // console.log(loginData);
        // 

    }
    return (
        <ProfileComponent
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            {
                (accountHolderProfileData.category == 'mentor') ?
                    //for mentor
                    <MentorProfileCard>
                        {
                            (accountHolderProfileData != null) ?
                                <ContainerData >
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Avatar src={accountHolderProfileData.profileimage.url} alt="Profile Image" sx={{ width: 90, height: 90 }} />
                                    </Box>
                                    <ContainerInputData direction={{ sm: "column", md: "row" }}>

                                        <LeftContainerStack direction='row' spacing={3}>

                                            <LeftContainerTitleStack direction='column' spacing={7}>
                                                <Typography>Name:</Typography>
                                                <Typography>Email:</Typography>
                                                <Typography>Phone Number:</Typography>
                                                <Typography>Address:</Typography>
                                                <Typography>Title:</Typography>
                                            </LeftContainerTitleStack>

                                            <LeftContainerInputStack direction='column' spacing={4} >
                                                <TextField variant="filled"
                                                    disabled={clickedEdit}
                                                    id="outlined-disabled"
                                                    value={accountHolderProfileData.name}
                                                    size='small' />

                                                <TextField variant="filled"
                                                    disabled={clickedEdit}
                                                    id="outlined-disabled"
                                                    value={accountHolderProfileData.email}
                                                    size='small' />

                                                <TextField variant="filled"
                                                    disabled={clickedEdit}
                                                    id="outlined-disabled"
                                                    value={accountHolderProfileData.phonenumber}
                                                    size='small' />

                                                <TextField variant="filled"
                                                    disabled={clickedEdit}
                                                    id="outlined-disabled"
                                                    value={accountHolderProfileData.address}
                                                    size='small' />

                                                <TextField variant="filled"
                                                    disabled={clickedEdit}
                                                    id="outlined-disabled"
                                                    value={accountHolderProfileData.title}
                                                    size='small' />
                                            </LeftContainerInputStack>
                                        </LeftContainerStack>

                                        <RightContainerStack direction='row' spacing={3}>
                                            <RightContainerTitleStack direction='column' spacing={7}>
                                                <Typography>About Me:</Typography>
                                                <Typography>Teaching Mode:</Typography>
                                                <Typography>Price Per Hour:</Typography>
                                                <Typography>Price Per Day:</Typography>
                                                <Typography>Skills:</Typography>
                                            </RightContainerTitleStack>

                                            <RightContainerInputStack direction='column' spacing={4} >
                                                <TextField variant="filled"
                                                    disabled={clickedEdit}
                                                    id="outlined-disabled"
                                                    value={accountHolderProfileData.aboutyou}
                                                    size='small' />

                                                <FormControl fullWidth variant='standard'>
                                                    <InputLabel id="demo-simple-select-label">Enter Teaching Mode</InputLabel>
                                                    <Select
                                                        disabled={clickedEdit}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        name='mode'
                                                        value={accountHolderProfileData.mode}
                                                        label="Enter Teaching Mode"
                                                    >
                                                        <MenuItem value="online">Online</MenuItem>
                                                        <MenuItem value="offline">Offline</MenuItem>
                                                        <MenuItem value="both">Both</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <TextField variant="filled"
                                                    disabled={clickedEdit}
                                                    id="outlined-disabled"
                                                    value={accountHolderProfileData.priceperday}
                                                    size='small' />
                                                <TextField variant="filled"
                                                    disabled={clickedEdit}
                                                    id="outlined-disabled"
                                                    value={accountHolderProfileData.priceperhour}
                                                    size='small' />
                                                <Autocomplete
                                                    disabled={clickedEdit}
                                                    multiple
                                                    limitTags={1}
                                                    id="tags-standard"
                                                    options={accountHolderProfileData.interest}
                                                    defaultValue={accountHolderProfileData.interest}
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
                                            </RightContainerInputStack>
                                        </RightContainerStack>
                                    </ContainerInputData>
                                    <Stack direction='row' spacing={2} sx={{ width: 'auto' }}>
                                        <Button onClick={editUserProfile}>Edit</Button>
                                        <Button onClick={updateMentorProfileData}>Save</Button>
                                    </Stack>
                                </ContainerData> :
                                <ContainerData spacing={2}>
                                    <Stack direction='row' spacing={4}>
                                        <Skeleton variant="rounded" sx={{ width: '106px', height: '25px' }} />
                                        <Skeleton variant="rounded" sx={{ width: '200px', height: '25px' }} />
                                    </Stack>
                                    <Stack direction='row' spacing={4}>
                                        <Skeleton variant="rounded" sx={{ width: '106px', height: '25px' }} />
                                        <Skeleton variant="rounded" sx={{ width: '200px', height: '25px' }} />
                                    </Stack>
                                    <Stack direction='row' spacing={4}>
                                        <Skeleton variant="rounded" sx={{ width: '106px', height: '25px' }} />
                                        <Skeleton variant="rounded" sx={{ width: '200px', height: '25px' }} />
                                    </Stack>
                                    <Stack direction='row' spacing={2} justifyContent="flex-end">
                                        <Skeleton variant="rounded" sx={{ width: '86px', height: '30px' }} />
                                        <Skeleton variant="rounded" sx={{ width: '86px', height: '30px' }} />
                                    </Stack>
                                </ContainerData>
                        }
                    </MentorProfileCard> :
                    //for user
                    <UserProfileCard sx={{ padding: '27px 33px 27px 33px' }}>
                        {
                            (accountHolderProfileData != null) ?
                                <ContainerData >
                                    <ContainerInputData direction={{ sm: "column", md: "row" }}>

                                        <LeftContainerStack direction='row' >

                                            <LeftContainerTitleStack direction='column' spacing={7}>
                                                <Typography>Name:</Typography>
                                                <Typography>Email:</Typography>

                                                {/* <Typography>Title:</Typography> */}
                                            </LeftContainerTitleStack>

                                            <LeftContainerInputStack direction='column' spacing={4} >
                                                <TextField variant="filled"
                                                    disabled={clickedEdit}
                                                    id="outlined-disabled"
                                                    value={(clickedEdit) ? accountHolderProfileData.name : null}
                                                    size='small'
                                                    name='name'
                                                    onChange={(event) => { onInputChangeOnEditUserData(event) }}
                                                />

                                                <TextField variant="filled"
                                                    disabled={clickedEdit}
                                                    id="outlined-disabled"
                                                    value={(clickedEdit) ? accountHolderProfileData.email : null}
                                                    size='small'
                                                    name='email'
                                                    onChange={(event) => { onInputChangeOnEditUserData(event) }}
                                                />



                                                {/* <TextField variant="filled"
                                                    disabled={clickedEdit}
                                                    id="outlined-disabled"
                                                    value={accountHolderProfileData.title}
                                                    size='small' /> */}
                                            </LeftContainerInputStack>
                                        </LeftContainerStack>

                                        <RightContainerStack direction='row' spacing={3}>
                                            <RightContainerTitleStack direction='column' spacing={7}>
                                                <Typography>Phone Number:</Typography>
                                                <Typography>Address:</Typography>
                                            </RightContainerTitleStack>

                                            <RightContainerInputStack direction='column' spacing={4} >
                                                <TextField variant="filled"
                                                    disabled={clickedEdit}
                                                    id="outlined-disabled"
                                                    value={(clickedEdit) ? accountHolderProfileData.phonenumber : null}
                                                    size='small'
                                                    name='phonenumber'
                                                    onChange={(event) => { onInputChangeOnEditUserData(event) }} />

                                                <TextField variant="filled"
                                                    disabled={clickedEdit}
                                                    id="outlined-disabled"
                                                    value={(clickedEdit) ? accountHolderProfileData.address : null}
                                                    size='small'
                                                    name='address'
                                                    onChange={(event) => { onInputChangeOnEditUserData(event) }} />
                                            </RightContainerInputStack>
                                        </RightContainerStack>
                                    </ContainerInputData>
                                    <Stack direction='row' spacing={2} sx={{ width: 'auto' }}>
                                        <Button onClick={editUserProfile}>Edit</Button>
                                        <Button onClick={updateUserProfileData}>Save</Button>
                                    </Stack>
                                </ContainerData> :
                                <ContainerData spacing={2}>
                                    <Stack direction='row' spacing={4}>
                                        <Skeleton variant="rounded" sx={{ width: '106px', height: '25px' }} />
                                        <Skeleton variant="rounded" sx={{ width: '200px', height: '25px' }} />
                                    </Stack>
                                    <Stack direction='row' spacing={4}>
                                        <Skeleton variant="rounded" sx={{ width: '106px', height: '25px' }} />
                                        <Skeleton variant="rounded" sx={{ width: '200px', height: '25px' }} />
                                    </Stack>
                                    <Stack direction='row' spacing={4}>
                                        <Skeleton variant="rounded" sx={{ width: '106px', height: '25px' }} />
                                        <Skeleton variant="rounded" sx={{ width: '200px', height: '25px' }} />
                                    </Stack>
                                    <Stack direction='row' spacing={2} justifyContent="flex-end">
                                        <Skeleton variant="rounded" sx={{ width: '86px', height: '30px' }} />
                                        <Skeleton variant="rounded" sx={{ width: '86px', height: '30px' }} />
                                    </Stack>
                                </ContainerData>
                        }
                    </UserProfileCard>
            }

            {/* <FirstContainer>
                    <Paper>
                        <ContainerData direction='row' spacing={2}>
                            <Box>
                                <img src={image} alt="" style={{ width: '200px', height: '200px' }} />
                            </Box>
                            <Box>
                                <Stack>
                                    <Typography>{accountHolderProfileData.name}</Typography>
                                    <Typography>I am a mentor in agartala</Typography>
                                    <Box>
                                        <Typography>Teaching Mode</Typography>
                                        <Stack direction='row' spacing={2}>
                                            <Typography variant="caption">Online</Typography>
                                            <Typography variant="caption">Offline</Typography>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Box>
                        </ContainerData>
                    </Paper>
                </FirstContainer> */}

            {/* <SecondContainer>
                    <Paper>
                        <ContainerData direction='row' spacing={2}>
                            <Box>
                                <Stack>
                                    <Typography>Biswajit Debnath</Typography>
                                    <Typography>I am a mentor in agartala</Typography>
                                    <Box>
                                        <Typography>Teaching Mode</Typography>
                                        <Stack direction='row' spacing={2}>
                                            <Typography variant="caption">Online</Typography>
                                            <Typography variant="caption">Offline</Typography>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Box>
                        </ContainerData>
                    </Paper>
                </SecondContainer> */}
        </ProfileComponent>
    )
}

import { React, useState, useContext } from 'react'
import { Box, Button, Dialog, TextField, Typography, styled } from "@mui/material";
import { authenticateRegistration, authenticateLogin } from '../../service/api';
import { userInfoAfterRegistration, userInfoAfterLogin } from "../../redux/actions/index"
import { useDispatch } from 'react-redux';

import userloginbg from './userloginbg.png'


const Component = styled(Box)`
height: 72vh;
width: 90vh;
`;
const LeftContainer = styled(Box)`
background: #424242;
height: auto;
width: 30%;
padding: 45.4px 35px;
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
}
`;

const LoginButton = styled(Button)`
text-transform: none;
background: #262626;
color: white;
height: 43px;
border-radius: 21px;
color: white;
font-weight: 600;
&:hover{
    background: #2d2d2d;
}
`;
const LoginButtonInRegistrationContainer = styled(Button)`
text-transform: none;
background: #fff;
color: black;
height: 43px;
border-radius: 9px;
box-shadow: 1px 2px 11px 2px rgb(0 0 0 / 20%);
margin-top: 15px;
&:hover{
    background: #e9e9e9;
}
`;
const CreateAccountText = styled(Typography)`
font-size: 14px;
text-align: center;
cursor: pointer;
font-weight: 600;
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
        heading: "Welcome!, Create an account",
        subHeading: "Register with email to get started"
    }
}

const initialRegistrationValue = {
    name: '',
    email: '',
    phonenumber: '',
    password: ''
}

const initialLoginValue = {
    email: '',
    password: ''
}

const isValidateEmail = (email) => {

    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    console.log(re.test(email))
    return re.test(email);
};

const isValidateMobileNumber = (mobile) => {

    const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return re.test(mobile);
};

export default function LoginDialog(props) {

    const [account, setToggleAccount] = useState(accountInitialValue.login);

    const [registrationData, setRegistrationData] = useState(initialRegistrationValue);
    const [loginData, setLoginData] = useState(initialLoginValue);
    const [error, setError] = useState({ error: false, errorText: '' });
    const [continuButton, setContinueButton] = useState({ text: 'Continue', isClicked: false })
    const [loginButton, setLoginButton] = useState({ text: 'Login', isClicked: false, createAccountText: 'block' })

    // const [ac, setAccount] = useState(DataContext);

    const toggleRegistration = () => {
        setToggleAccount(accountInitialValue.registration)
    }

    const toggleLogin = () => {
        setToggleAccount(accountInitialValue.login)
    }

    const handleClose = () => {
        props.setOpenLoginDialog(false);
        setToggleAccount(accountInitialValue.login);
        setError(false, '');
        setLoginButton({ text: 'Continue', isClicked: false })
        setLoginButton({ text: 'Login', isClicked: false })
    }

    const onInputChangeOnLogin = (event) => {
        setLoginData({ ...loginData, [event.target.name]: event.target.value })
    }

    const onInputChangeOnRegistration = (event) => {
        setRegistrationData({ ...registrationData, [event.target.name]: event.target.value })
    }

    const dispatch = useDispatch();

    const registerUser = async () => {
        setContinueButton({ text: 'Submiting...', isClicked: true });

        if (registrationData.name == '' || registrationData.phonenumber == '' || registrationData.email == '' || registrationData.password == '') {
            console.log("empty")
            setError({ error: true, errorText: "All the fields are required" });
            setContinueButton({ text: 'Continue', isClicked: false });
            return;
        }
        // console.log(isValidateEmail('biswajitdeb324@gmail.com'))
        if (!isValidateEmail(registrationData.email.toLowerCase())) {
            // console.log("empty")
            setError({ error: true, errorText: "Please enter a valid email Id" });
            setContinueButton({ text: 'Continue', isClicked: false });
            return;
        }

        if (!isValidateMobileNumber(registrationData.phonenumber)) {
            // console.log("empty")
            setError({ error: true, errorText: "Please enter a valid mobile number" });
            setContinueButton({ text: 'Continue', isClicked: false });
            return;
        }

        registrationData.email = registrationData.email.toLowerCase();
        let response = await authenticateRegistration(registrationData);

        // if (!response) return;
        if (response.status === 200) {
            handleClose();
            // setAccount(registerUser.name);
            localStorage.setItem('accountHolderData', JSON.stringify(response.data.studentData))
            console.log(response);
            console.log(response.data.studentData);
            dispatch(userInfoAfterRegistration(registrationData));
        } else {
            setError({ error: true, errorText: 'User already exist' });
            setContinueButton({ text: 'Continue', isClicked: false });
        }


    }
    const loginUser = async () => {
        setLoginButton({ text: 'Submitting...', isClicked: true, createAccountText: 'none' })
        console.log(loginData)
        if (loginData.email == '' || loginData.password == '') {
            console.log("empty")
            setError({ error: true, errorText: "All the fields are required" });
            setLoginButton({ text: 'Login', isClicked: false, createAccountText: 'block' })
            return;
        }
        // console.log(isValidateEmail('biswajitdeb324@gmail.com'))
        if (!isValidateEmail(loginData.email.toLowerCase())) {
            // console.log("empty")
            setError({ error: true, errorText: "Please enter a valid email Id" });
            setLoginButton({ text: 'Login', isClicked: false, createAccountText: 'block' })
            return;
        }

        loginData.email = loginData.email.toLowerCase();
        let response = await authenticateLogin(loginData);

        if (response.status === 200) {
            // console.log("hi response", response)
            // console.log("hi response", response.data.data.token)
            //
            localStorage.setItem('learnerbyauthtoken', response.data.data.token)
            localStorage.setItem('accountHolderData', JSON.stringify(response.data.data.userLogin))
            console.log(response.data.data.userLogin)
            // localStorage.setItem('category', 'user')
            //
            handleClose();
            dispatch(userInfoAfterLogin(response))
        } else {
            console.log(error)
            setError({ error: true, errorText: 'Please enter valid login details' });
            setLoginButton({ text: 'Login', isClicked: false, createAccountText: 'block' })
        }
        // handleClose();
        // setAccount(registerUser.name);
        // console.log(loginData);
        // 

    }

    return (
        <Dialog open={props.openLoginDialog} onClose={handleClose} PaperProps={{ sx: { maxWidth: "unset" } }}>
            <Component>
                <Box style={{ display: "flex", height: "100%" }}>
                    <LeftContainer>
                        <Typography variant='h5'>{account.heading}</Typography>
                        <Typography variant='h7' style={{ marginTop: "20px" }}>{account.subHeading}</Typography>
                        <img src={userloginbg} style={{ height: '206px', width: '206px', marginTop: '123px' }} alt="mentorloginbg" />
                    </LeftContainer>
                    {
                        account.view === "login" ?
                            <RightContainer>
                                <TextField variant='standard' name='email' type='email' onChange={(event) => { onInputChangeOnLogin(event) }} label='Enter Email/Phone Number' />



                                <TextField
                                    variant='standard' name='password'
                                    onChange={(event) => { onInputChangeOnLogin(event) }}
                                    label='Enter Password'
                                    type='password'
                                />
                                {/* <TermsConditionText>By continuing, you agree to Learnerby`s terms of use and privacy policy</TermsConditionText> */}
                                {
                                    (error.error) ?
                                        <Error>{error.errorText}</Error> :
                                        null
                                }
                                <LoginButton onClick={() => { loginUser() }} disabled={loginButton.isClicked}>
                                    <Typography sx={{ color: 'white' }}>{loginButton.text}</Typography>
                                </LoginButton>
                                <CreateAccountText onClick={toggleRegistration} sx={{ display: loginButton.createAccountText }}>New to Learnerby? Create an account</CreateAccountText>
                            </RightContainer> :

                            <RightContainer>
                                <TextField variant='standard' name='name' onChange={(event) => { onInputChangeOnRegistration(event) }} label='Enter Name' />
                                <TextField variant='standard' name='email' onChange={(event) => { onInputChangeOnRegistration(event) }} label='Enter Email' />
                                <TextField variant='standard' name='phonenumber' onChange={(event) => { onInputChangeOnRegistration(event) }} label='Enter Phone Number' />
                                <TextField variant='standard' name='password' onChange={(event) => { onInputChangeOnRegistration(event) }} label='Enter Password' />
                                {
                                    (error.error) ?
                                        <Error>{error.errorText}</Error> :
                                        null
                                }
                                <LoginButton onClick={() => { registerUser() }} disabled={continuButton.isClicked}>
                                    <Typography sx={{ fontWeight: '600', color: '#fff' }}> {continuButton.text}</Typography>
                                </LoginButton>
                                <Typography style={{ textAlign: "center" }}>OR</Typography>
                                <LoginButtonInRegistrationContainer onClick={toggleLogin} disabled={continuButton.isClicked}>
                                    <Typography sx={{ fontWeight: '600' }}>Login</Typography>
                                </LoginButtonInRegistrationContainer>
                            </RightContainer>
                    }
                </Box>
            </Component>
        </Dialog>
    )
}

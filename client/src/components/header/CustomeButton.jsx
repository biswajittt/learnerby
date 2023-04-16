import React, { useId } from 'react'
import { Stack, Button, Typography, styled, Box, Avatar, Menu, MenuItem } from '@mui/material';
import { useState, useContext } from 'react';
import LoginDialog from '../login/LoginDialog';
import MentorLoginDialog from '../login/MentorLoginDialog';

import { useSelector } from 'react-redux';
import Profile from './Profile';

import PersonIcon from '@mui/icons-material/Person';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';



const Container = styled(Box)(({ theme }) => ({
    justifyContent: 'flex-end'
}))

const CustomButtonInBigScreen = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down(900)]: {
        display: 'none'
    }
}))

const CustomButtonInSmallScreen = styled(Box)(({ theme }) => ({
    display: 'none',
    // [theme.breakpoints.up('md')]: {
    //     display: 'none',
    // },
    [theme.breakpoints.down(900)]: {
        display: 'block',
    }
}))
const MenuButton = styled(Button)(({ theme }) => ({
    display: 'block',
    [theme.breakpoints.down(421)]: {
        marginLeft: '-17px'
    },
    [theme.breakpoints.down(331)]: {
        display: 'none',
    },
}))
const DashBoardText = styled(Typography)(({ theme }) => ({
    fontWeight: '600',
    color: 'black',
    fontSize: '15px',
    [theme.breakpoints.down(491)]: {
        fontSize: '13px',
    },
    [theme.breakpoints.down(421)]: {
        fontSize: '10px',
        fontWeight: 'bold',
    },
}))



export default function CustomeButton() {
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [mentorLoginDialog, setMentorLoginDialog] = useState(false);

    const openDialog = () => {
        setOpenLoginDialog(true);
    }

    const openMentorLoginDialog = () => {
        setMentorLoginDialog(true);
    }
    // const category = localStorage.getItem('category')
    const retrievedData = localStorage.getItem('accountHolderData')

    const accountHolderProfileData = JSON.parse(retrievedData)

    console.log("from bb", accountHolderProfileData)

    const loadProfilePage = () => {
        if (accountHolderProfileData.category == 'mentor') {
            navigate(`/mentor/dashboard/${accountHolderProfileData._id}`)
        } else {
            navigate(`/student/dashboard/${accountHolderProfileData._id}`)
        }

        handleClose();
    }

    const logout = () => {
        if (localStorage.getItem('accountHolderData')) {
            const accountHolderProfileData = JSON.parse(retrievedData)
            if (accountHolderProfileData.category == 'mentor') {
                localStorage.removeItem("accountHolderData");
                localStorage.removeItem("bookedClasses");
                // localStorage.removeItem("category");
                handleClose();
                navigate('/');
            } else {
                localStorage.removeItem("accountHolderData");
                localStorage.removeItem("bookedClasses");
                localStorage.removeItem("learnerbyauthtoken");
                // localStorage.removeItem("com.learnerby.rating");

                // localStorage.removeItem("category");
                handleClose();
                navigate('/');
            }
        }

    }

    return (
        <>

            {
                (accountHolderProfileData != null) ?
                    <Stack direction='row' spacing={2}>
                        {/* <Typography>{accountHolderProfileData.name}</Typography>
                            <Typography>Logout</Typography> */}
                        {/* <Link to={`/profile/user/${accountHolderProfileData._id}`}> */}
                        <Box>
                            <MenuButton
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                size='small'
                                sx={{ background: '#e8e8e8', padding: "6px 14px 5px 14px", borderRadius: '10px' }}
                            >
                                <DashBoardText>
                                    DASHBORAD
                                </DashBoardText>
                            </MenuButton>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={loadProfilePage}>
                                    {/* <Typography onClick={handleClose}>
                                        Profile
                                    </Typography> */}
                                    {/* {
                                        (category == 'mentor') ?
                                            <Link to={`/profile/mentor/${accountHolderProfileData._id}`} >
                                                Profile
                                            </Link> :
                                            <Link to={`/profile/user/${accountHolderProfileData._id}`} >
                                                Profile
                                            </Link>
                                    } */}
                                    Profile
                                </MenuItem>
                                {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                                <MenuItem onClick={logout}>Logout</MenuItem>
                            </Menu>
                        </Box>
                        {/* </Link> */}
                    </Stack> :
                    <Stack direction='row'>
                        <CustomButtonInBigScreen className='qqqqq' >
                            <Stack direction='row' spacing={2}>
                                <Button variant='container' sx={{ backgroundColor: "#2b2b2b", color: "white" }}
                                    onClick={() => { openDialog() }} >
                                    Login</Button>
                                <Button color='inherit' onClick={() => { openMentorLoginDialog() }}>
                                    <Typography sx={{ fontWeight: 'bold' }}>
                                        Become a Mentor
                                    </Typography>
                                </Button>
                            </Stack>
                        </CustomButtonInBigScreen>

                        <CustomButtonInSmallScreen  >
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                DASHBORAD
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={() => { openDialog() }}>
                                    <Button color='inherit'
                                        onClick={() => { openDialog() }} >
                                        Login</Button>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Button color='inherit' onClick={() => { openMentorLoginDialog() }}>Become a Mentor</Button>
                                </MenuItem>
                            </Menu>
                        </CustomButtonInSmallScreen>
                    </Stack>
            }

            <LoginDialog openLoginDialog={openLoginDialog} setOpenLoginDialog={setOpenLoginDialog} />
            <MentorLoginDialog mentorLoginDialog={mentorLoginDialog} setMentorLoginDialog={setMentorLoginDialog} />
        </>
    )
}

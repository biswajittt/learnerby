import { SettingsAccessibilityOutlined } from '@mui/icons-material';
import { Box, Menu, MenuItem, Typography, styled } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';

const MenuComponent = styled(Box)`
margin-top: 5px;
`;

const Logout = styled(Typography)`
font-size: 14px;
margin-left: 20px;
`
export default function Profile(props) {
    const [open, setOpen] = useState(false);

    const handleClick = (event) => {
        setOpen(event.currentTarget)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const logoutUser = () => {
        props.userInfo = []
    }

    // const result = useSelector((state) => state.mentorInfo)
    // console.log(result)
    return (
        <>
            <Box onClick={handleClick}>
                <Typography style={{ marginTop: 2, cursor: 'pointer' }}>{props.userInfo[0].name}</Typography>
            </Box>
            <MenuComponent
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                MenuListProps={{ 'aria-labelledby': 'basci-button' }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={() => { handleClose(); logoutUser() }}>
                    <Logout>Logout</Logout>
                </MenuItem>
            </MenuComponent>
        </>
    )
}

import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, styled, Box, Typography, Button, InputBase, Drawer, List, ListItem, getTextFieldUtilityClass } from "@mui/material";
import { IconButton } from "@mui/material";
import { CatchingPokemon } from '@mui/icons-material';
import { Stack } from '@mui/system';
import CustomeButton from './CustomeButton';
import { Link } from "react-router-dom"
import MenuIcon from '@mui/icons-material/Menu';
// import logo from './study.png'


import SearchBar from './SearchBar';




const Learnerby = styled(Stack)(({ theme }) => ({
    [theme.breakpoints.down(621)]: {
        display: 'none'
    }
}));

const CustomButtonWrapper = styled(Box)(({ theme }) => ({
    margin: '0 5% 0 auto',
    [theme.breakpoints.down(656)]: {
        margin: '0',
    }
}));

export default function Header() {




    return (

        <Box>
            <AppBar position='fixed' color='grey' sx={{ overflow: "hidden" }}>
                <Toolbar >
                    <Box>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <Learnerby>
                                {/* <img src={logo} /> */}
                                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                                    LEARNERBY
                                </Typography>
                            </Learnerby>

                        </Link>
                    </Box>

                    <SearchBar />
                    <Box sx={{ flexGrow: 1 }} />

                    <CustomButtonWrapper>
                        <CustomeButton />
                    </CustomButtonWrapper>

                </Toolbar>
            </AppBar>
        </Box>
    )
}

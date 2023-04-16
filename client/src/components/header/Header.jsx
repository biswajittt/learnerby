import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, styled, Box, Typography, Button, InputBase, Drawer, List, ListItem, getTextFieldUtilityClass, useTheme } from "@mui/material";
import { IconButton } from "@mui/material";
import { CatchingPokemon } from '@mui/icons-material';
import { Stack } from '@mui/system';
import CustomeButton from './CustomeButton';
import { Link } from "react-router-dom"
import MenuIcon from '@mui/icons-material/Menu';
// import logo from './study.png'

import SearchBar from './SearchBar';




const Learnerby = styled(Stack)(({ theme }) => ({
    [theme.breakpoints.down(646)]: {
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

    const theme = useTheme();
    // const onlySmallScreen = useMediaQuery(theme.breakpoints.down(387));

    return (

        <Box>
            <AppBar position='fixed' color='grey' sx={{ overflow: "hidden" }} >
                <Toolbar
                    sx={(theme) => ({
                        [theme.breakpoints.down(387)]: {
                            paddingLeft: '5px',
                            paddingRight: '5px',
                        },
                        [theme.breakpoints.down(362)]: {
                            paddingLeft: '2px',
                            paddingRight: '2px',
                        },
                    })}
                >
                    <Box>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <Learnerby>
                                {/* <img src={logo} /> */}
                                <Typography variant='h6' component='div' sx={{ flexGrow: 1, fontSize: '26px', fontWeight: 'bold', color: 'black', fontFamily: 'cursive' }}>
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

import { Box, styled, Typography } from '@mui/material'
import React from 'react'
import { homeNavData } from './constants/data'

import { CalculateSharpIcon, ScienceRoundedIcon, JavascriptRoundedIcon, HtmlRoundedIcon, CssRoundedIcon, PhpRoundedIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const Component = styled(Box)(({ theme }) => ({
    display: 'flex',
    margin: '9px 68px 0 68px',
    justifyContent: 'space-between',
    overflow: 'hidden'
    , [theme.breakpoints.down('lg')]: {
        margin: '9px 0 0 0'
    },
    [theme.breakpoints.down(743)]: {
        overflowX: 'scroll'
    }
}))

const Container = styled(Box)(({ theme }) => ({
    padding: '12px 8px',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {

    }
}))

const Image = styled('img')(({ theme }) => ({

    [theme.breakpoints.up('md')]: {
        width: '55px'
    },
    [theme.breakpoints.down('md')]: {
        width: '47px'
    },

}))

const Text = styled(Typography)`
font-size: 15px;
font-weight: 600;
font-family: inherit;
`;
export default function HomeNavbar() {
    return (
        <Box sx={{ background: 'white', marginTop: '68px' }}>
            <Component>
                {
                    homeNavData.map((data) => (
                        <Link to={`/searchpage/searchquery/${data.searchKey}`} style={{ textDecoration: 'none' }}>
                            <Container>

                                <Image src={data.url} alt="nav" />
                                <Text sx={{ color: 'black' }}>{data.text}</Text>
                            </Container>
                        </Link>

                    ))
                }
            </Component>
        </Box>
    )
}

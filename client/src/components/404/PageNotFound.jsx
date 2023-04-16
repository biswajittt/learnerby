import { Container, Box, Stack, Typography, styled } from '@mui/material'
import React from 'react'
import NotFoundImage from './images/404.png'

const Image = styled('img')(({ theme }) => ({
    width: '900px',
    [theme.breakpoints.down(916)]: {
        width: '790px',
        marginTop: '36px'
    },
    [theme.breakpoints.down(890)]: {
        width: '700px',
        marginTop: '77px'
    },
    [theme.breakpoints.down(701)]: {
        width: '600px',
        marginTop: '105px'
    },
    [theme.breakpoints.down(601)]: {
        width: '500px',
        marginTop: '141px'
    },
    [theme.breakpoints.down(501)]: {
        width: '400px',
        marginTop: '168px'
    },
    [theme.breakpoints.down(401)]: {
        width: '300px',
    },
    [theme.breakpoints.down(301)]: {
        width: '200px',
    },
}))
export default function PageNotFound() {
    return (
        <Container sx={{ marginTop: '50px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {/* <Stack direction='row'>
                    <Typography sx={{ fontSize: '200px', fontWeight: 'bold' }}>4</Typography>
                    <Typography sx={{ fontSize: '200px', fontWeight: 'bold' }}>0</Typography>
                    <Typography sx={{ fontSize: '200px', fontWeight: 'bold' }}>4</Typography>
                </Stack> */}
                <Stack spacing={2}>
                    <Image src={NotFoundImage} />
                    <Typography sx={{ fontSize: '20px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', opacity: '70%' }}>Page not found</Typography>
                </Stack>
            </Box>
        </Container>
    )
}

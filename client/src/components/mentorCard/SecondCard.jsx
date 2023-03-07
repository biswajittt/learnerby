import { Box, styled, Paper, Grid, Typography, Chip, Rating } from '@mui/material'
import React from 'react'
import img from '../mentorCard/mentor.jpg'
import TagFacesIcon from '@mui/icons-material/TagFaces';

const Component = styled(Box)`
display: flex;
padding: 9px 68px 0 68px;
justify-content: space-between;
margin-bottom: 20px;
`;

const MentorContainer = styled(Box)`

`;

const Container = styled(Paper)`

`;


export default function SecondCard() {
    return (
        <Component sx={{ background: 'white' }}>
            <MentorContainer
                sx={{
                    display: 'flex',
                    '& > :not(style)': {
                        m: 1,
                        width: 228,
                        height: 286,
                    },
                }}
            >
                <Container elevation={3} square>

                </Container>
            </MentorContainer>
        </Component>
    )
}

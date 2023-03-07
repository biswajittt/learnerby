import { Box, styled, Paper, Grid, Typography, Chip, Rating } from '@mui/material'
import React from 'react'
import img from '../mentorCard/mentor.jpg'
import TagFacesIcon from '@mui/icons-material/TagFaces';

const Component = styled(Box)`

padding: 9px 68px 0 68px;
justify-content: space-between;
margin-bottom: 20px;
`;

const MentorContainer = styled(Box)`

`;

const Container = styled(Paper)`
border-radius: 10px;
`;

export default function FirstCard() {
    return (
        <Component sx={{ background: 'white' }}>
            <Box>
                <Grid container>
                    <Grid item xs={11}>
                        <Typography>Most Popular</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>View All</Typography>
                    </Grid>
                </Grid>
            </Box>
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
                    <img src={img} alt="u" style={{ width: 211, height: 126, padding: "9px 9px 9px 9px" }} />
                    <Box sx={{ padding: '4px 4px 4px 4px' }}>
                        <Grid container>
                            <Grid item xs={7}>
                                <Paper elevation={0} >
                                    <Typography mt={1} sx={{ fontSize: '12px', fontWeight: 'bold' }}>Biswajit Debnath</Typography>
                                    <Typography mt={0.2} sx={{ fontSize: '12px' }}>Experts In</Typography>
                                    <Chip size='small' label='Math' />
                                    <Chip size='small' label='Physics' />
                                    <Chip size='small' label='Chemistry' />
                                </Paper>
                            </Grid>
                            <Grid item xs={5}>
                                <Paper elevation={0} >
                                    <Rating value={4} size='small' readOnly></Rating>
                                </Paper>
                                <Chip variant="outlined" size='small' color="success" icon={<TagFacesIcon />} label='50rs/hour' sx={{ marginTop: "77px" }} />
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </MentorContainer>
        </Component>
    )
}

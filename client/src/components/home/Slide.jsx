import { Box, Typography, styled, Button, Divider, Paper, Grid, Chip, Rating, Skeleton, Stack } from '@mui/material';
import React from 'react'
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css'
import { homeNavData } from './constants/data';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { width } from '@mui/system';
import { Link } from "react-router-dom"

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    laptop: {
        breakpoint: { max: 1024, min: 745 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 745, min: 543 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 543, min: 427 },
        items: 2
    },
    smallmobile: {
        breakpoint: { max: 427, min: 0 },
        items: 1
    }
};


const Component = styled(Box)`
margin-top: 20px; 
background: #ffffff;
`

const Subject = styled(Box)(({ theme }) => ({
    padding: '15px 20px',
    display: 'flex',
    [theme.breakpoints.down(372)]: {
        padding: '9px 5px',
    }
}))

const ViewAllButton = styled(Button)(({ theme }) => ({
    marginLeft: 'auto',
    [theme.breakpoints.down(380)]: {
        width: '84px'
    },
}))


// const Image = styled('img')({
//     width: '163px',
//     height: '123px'
// })

const Container = styled(Paper)`
margin: 27px 4px 24px 4px;
`
const Image = styled('img')(({ theme }) => ({

    [theme.breakpoints.up('lg')]: {
        width: '163px',
        height: '123px'
    },
    [theme.breakpoints.down('lg')]: {
        width: '163px',
        height: '123px'
    },
    [theme.breakpoints.down(1123)]: {
        width: '142px',
        height: '119px'
    },
    [theme.breakpoints.down(1024)]: {
        width: '142px',
        height: '119px'
    },
    [theme.breakpoints.down(843)]: {
        width: '124px',
        height: '112px'
    },
    [theme.breakpoints.down(606)]: {
        width: '109px',
        height: '97px'
    },
    [theme.breakpoints.down(546)]: {
        width: '131px',
        height: '109px'
    },
    [theme.breakpoints.down(496)]: {
        width: '112px',
        height: '94px'
    },
    [theme.breakpoints.down(427)]: {
        width: '160px',
        height: '137px'
    },
    [theme.breakpoints.down(394)]: {
        width: '131px',
        height: '101px'
    },
    [theme.breakpoints.down(337)]: {
        width: '116px',
        height: '92px'
    },

}))

const MentorCard = styled(Box)`

`
export default function Slide(props) {
    // console.log("from slide", props.mentors)
    console.log("props: ", props.mentors)
    console.log()
    return (
        <>
            {
                (props.mentors.length > 0) ?
                    <Component>
                        <Subject>
                            {
                                (props.type == "Teaching Mode") ?
                                    <Typography>{props.type + ": " + props.title}</Typography> :
                                    <Typography>{props.title}</Typography>
                            }

                            <ViewAllButton variant='contained' size='small'>View all</ViewAllButton>
                        </Subject>
                        <Divider />
                        <Carousel
                            responsive={responsive} swipeable={false} draggable={false} infinite={true}
                            keyBoardControl={true} centerMode={true}
                            dotListClass='custom-dot-list-style'
                            itemClass='carousel-item-padding-40-px' containerClass='carousel-container'
                        >

                            {
                                props.mentors.map((data) => (
                                    <Link to={`mentordetails/${data._id}`} style={{ textDecoration: 'none' }}>
                                        <Container>
                                            <MentorCard textAlign='center' style={{ padding: "9px 5px 9px 5px" }}>
                                                <Image src={data.profileimage.url} alt="banner" />
                                                <Typography mt={1} sx={{ fontSize: '12px', fontWeight: 'bold' }}>{data.name}</Typography>
                                                <Paper elevation={0} >
                                                    <Rating value={4} size='small' readOnly></Rating>
                                                </Paper>
                                                <Chip variant="outlined" size='small' color="success" icon={<TagFacesIcon />} label={data.priceperhour + "rs /hour"} sx={{ margin: "7px 0px 7px 0px" }} />
                                            </MentorCard>
                                        </Container>
                                    </Link>
                                ))
                            }
                        </Carousel>
                    </Component> :
                    <Component>
                        <Subject>
                            <Skeleton variant="rounded" animation="wave" sx={{ width: '166px', height: '22px' }} />
                            <Skeleton variant="rounded" animation="wave" sx={{ width: '90px', height: '26px', marginLeft: 'auto' }} />

                        </Subject>
                        <Divider />
                        <Carousel
                            responsive={responsive} swipeable={false} draggable={false} infinite={true}
                            keyBoardControl={true} centerMode={true}
                            dotListClass='custom-dot-list-style'
                            itemClass='carousel-item-padding-40-px' containerClass='carousel-container'
                        >
                            <Stack sx={{ margin: '27px 4px 24px 4px' }} direction='row' spacing={4}>
                                <Paper sx={{ width: '195px', height: '205px' }}>
                                    <Box sx={{ padding: "7px 7px 0px 7px" }}>
                                        <Skeleton variant="rounded" animation="wave" sx={{ width: '180px', height: '123px' }} />

                                        <Skeleton variant="rounded" animation="wave" sx={{ marginTop: '10px', width: '142px', height: '9px' }} />
                                        <Skeleton variant="rounded" animation="wave" sx={{ marginTop: '10px', width: '175px', height: '16px' }} />
                                        <Skeleton variant="rounded" animation="wave" sx={{ marginTop: '10px', width: '82px', height: '17px' }} />
                                    </Box>
                                </Paper>
                                <Paper sx={{ width: '195px', height: '205px' }}>
                                    <Box sx={{ padding: "7px 7px 0px 7px" }}>
                                        <Skeleton variant="rounded" animation="wave" sx={{ width: '180px', height: '123px' }} />

                                        <Skeleton variant="rounded" animation="wave" sx={{ marginTop: '10px', width: '142px', height: '9px' }} />
                                        <Skeleton variant="rounded" animation="wave" sx={{ marginTop: '10px', width: '175px', height: '16px' }} />
                                        <Skeleton variant="rounded" animation="wave" sx={{ marginTop: '10px', width: '82px', height: '17px' }} />
                                    </Box>
                                </Paper>
                                <Paper sx={{ width: '195px', height: '205px' }}>
                                    <Box sx={{ padding: "7px 7px 0px 7px" }}>
                                        <Skeleton variant="rounded" animation="wave" sx={{ width: '180px', height: '123px' }} />

                                        <Skeleton variant="rounded" animation="wave" sx={{ marginTop: '10px', width: '142px', height: '9px' }} />
                                        <Skeleton variant="rounded" animation="wave" sx={{ marginTop: '10px', width: '175px', height: '16px' }} />
                                        <Skeleton variant="rounded" animation="wave" sx={{ marginTop: '10px', width: '82px', height: '17px' }} />
                                    </Box>
                                </Paper>
                                <Paper sx={{ width: '195px', height: '205px' }}>
                                    <Box sx={{ padding: "7px 7px 0px 7px" }}>
                                        <Skeleton variant="rounded" animation="wave" sx={{ width: '180px', height: '123px' }} />

                                        <Skeleton variant="rounded" animation="wave" sx={{ marginTop: '10px', width: '142px', height: '9px' }} />
                                        <Skeleton variant="rounded" animation="wave" sx={{ marginTop: '10px', width: '175px', height: '16px' }} />
                                        <Skeleton variant="rounded" animation="wave" sx={{ marginTop: '10px', width: '82px', height: '17px' }} />
                                    </Box>
                                </Paper>
                                <Paper sx={{ width: '195px', height: '205px' }}>
                                    <Box sx={{ padding: "7px 7px 0px 7px" }}>
                                        <Skeleton variant="rounded" animation="wave" sx={{ width: '180px', height: '123px' }} />

                                        <Skeleton variant="rounded" animation="wave" sx={{ marginTop: '10px', width: '142px', height: '9px' }} />
                                        <Skeleton variant="rounded" animation="wave" sx={{ marginTop: '10px', width: '175px', height: '16px' }} />
                                        <Skeleton variant="rounded" animation="wave" sx={{ marginTop: '10px', width: '82px', height: '17px' }} />
                                    </Box>
                                </Paper>

                            </Stack>
                        </Carousel>
                    </Component>
            }
        </>
    )
}

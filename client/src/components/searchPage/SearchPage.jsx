import { styled, Avatar, Box, Card, CardContent, Chip, Grid, Paper, Rating, Skeleton, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import logo from "../searchPage/mentor.jpg"
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from "react-router-dom"
import { getMentorsDataBySearchQuery } from "../../redux/actions/index"


const SearchPageContainer = styled(Box)`

margin-top: 100px;
display: flex;
align-items: center;
justify-content: center;
`

const MentorDetailsCard = styled(Paper)(({ theme }) => ({
    width: '850px',
    height: '200px',

    [theme.breakpoints.down(860)]: {
        width: '767px',
        height: '200px',
    },
    [theme.breakpoints.down(779)]: {
        width: 'auto',
        marginLeft: '10px',
        marginRight: '10px',
    },
    [theme.breakpoints.down(524)]: {
        height: '330px',
    },
    [theme.breakpoints.down(427)]: {
        height: '401px',
        marginBottom: '17px'
    },
    [theme.breakpoints.down(293)]: {
        marginRight: '0px'
    },
}));
const MentorProfileImageContainer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down(524)]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10px'
    },
}));
const MentorProfileImage = styled(Avatar)(({ theme }) => ({
    width: '176px',
    height: '176px',
    [theme.breakpoints.down(524)]: {
        width: '176px',
        height: '176px'
    },
}));
const MentorDetailsCardContainer = styled(Stack)(({ theme }) => ({
    [theme.breakpoints.down(524)]: {
        flexDirection: 'column'
    },
}));
const InsideMentorDetailsCardContainer = styled(Stack)(({ theme }) => ({
    // [theme.breakpoints.down(524)]: {
    //     flexDirection: 'column'
    // },
    [theme.breakpoints.down(427)]: {
        flexDirection: 'column'
    },

}));
const FirstMentorDetailsCardContainer = styled(Stack)(({ theme }) => ({
    [theme.breakpoints.down(427)]: {
        marginBottom: '6px'
    },
}));
const SecondMentorDetailsCardContainer = styled(Stack)(({ theme }) => ({
    // [theme.breakpoints.down(427)]: {
    //     marginTop: '10px'
    // },
}));
// const InsideFirstMentorDetailsCardContainer = styled(Box)(({ theme }) => ({

// }));
const InsideFirstMentorDetailsCardContainer = styled(Stack)(({ theme }) => ({
    marginRight: '280px',
    [theme.breakpoints.down(860)]: {
        marginRight: '212px',
    },
    [theme.breakpoints.down(779)]: {
        marginRight: '88px',
    },
    [theme.breakpoints.down(705)]: {
        marginRight: '20px',
    },
    [theme.breakpoints.down(584)]: {
        marginRight: '0px',
    },
}));
const MentorDetailsCardContainerMentorPrice = styled(Stack)(({ theme }) => ({
    marginTop: '111px',
    [theme.breakpoints.down(524)]: {
        marginTop: '50px'
    },
    [theme.breakpoints.down(427)]: {
        marginTop: '7px'
    },
}));
export default function SearchPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { searchquery } = useParams()

    console.log(searchquery)
    useEffect(() => {
        dispatch(getMentorsDataBySearchQuery(searchquery))
    }, [dispatch])

    const { loading, mentor } = useSelector((state) => state.getMentorsDataBySearchQueryReducers)
    // console.log("from sp: ", mentor)

    // const loadMentorDetailsPage = (mentorId) => {
    //     console.log('clicked')
    //     navigate(`/mentordetails/${mentorId}`)
    // }
    console.log(loading)

    return (
        <SearchPageContainer>
            {
                (typeof mentor != 'undefined' && mentor.length > 0) ?
                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                        <Stack spacing={2}>
                            {
                                mentor.map((data, index) => (
                                    <Link to={`/mentordetails/${data._id}`} style={{ textDecoration: 'none' }}>
                                        <MentorDetailsCard key={index} >
                                            <CardContent>
                                                <MentorDetailsCardContainer direction='row' spacing={2}>
                                                    <MentorProfileImageContainer>
                                                        <MentorProfileImage variant="rounded" src={data.profileimage.url} />
                                                    </MentorProfileImageContainer>
                                                    <InsideMentorDetailsCardContainer direction='row' spacing={2}>
                                                        <FirstMentorDetailsCardContainer direction='row' spacing={2}>
                                                            <Box>
                                                                <InsideFirstMentorDetailsCardContainer direction='column'>
                                                                    <Typography variant="h6">{data.name}</Typography>
                                                                    <Typography variant="caption">I am a mentor in agartala</Typography>
                                                                    <Typography variant="h8">Mode of teaching</Typography>
                                                                    <Stack direction='row' spacing={2} sx={{ margin: '4px 0 0 8px' }}>
                                                                        {

                                                                            data.mode === 'both' ?
                                                                                <Stack direction='row' spacing={2}>
                                                                                    <Chip label='Online' sx={{ margin: '2px 2px 2px 2px' }} />
                                                                                    <Chip label='Offline' sx={{ margin: '2px 2px 2px 2px' }} />
                                                                                </Stack>
                                                                                :
                                                                                <Chip label={data.mode} sx={{ margin: '2px 2px 2px 2px' }} />

                                                                        }
                                                                    </Stack>
                                                                </InsideFirstMentorDetailsCardContainer>
                                                            </Box>
                                                        </FirstMentorDetailsCardContainer>

                                                        <SecondMentorDetailsCardContainer>
                                                            <Rating name="read-only" value={4} readOnly />
                                                            <MentorDetailsCardContainerMentorPrice direction='row' spacing={2}>
                                                                <Chip label={data.priceperhour + "rs /hour"} sx={{ margin: '2px 2px 2px 2px' }} />
                                                                <Chip label={data.priceperday + "rs /day"} sx={{ margin: '2px 2px 2px 2px' }} />
                                                            </MentorDetailsCardContainerMentorPrice>
                                                        </SecondMentorDetailsCardContainer>
                                                    </InsideMentorDetailsCardContainer>

                                                </MentorDetailsCardContainer>
                                                {/* <Grid container spacing={2}>
                                                    <Grid item xs={9}>

                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        
                                                    </Grid>
                                                </Grid> */}
                                            </CardContent>
                                        </MentorDetailsCard>
                                    </Link>
                                ))
                            }

                        </Stack>
                    </Box> :

                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                        {
                            (loading == false) ?
                                <Typography
                                    sx={{ marginTop: '216px', fontWeight: 'bold', fontSize: '17px' }}
                                >No Data Found</Typography> :
                                <Stack spacing={2}>
                                    <MentorDetailsCard sx={{ width: '850px', height: '200px' }} >
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid item xs={9}>
                                                    <Stack direction='row' spacing={2}>
                                                        <Box>
                                                            <MentorProfileImage variant="rounded">
                                                                <Skeleton variant="rounded" width='inherit' height='inherit' />
                                                            </MentorProfileImage>
                                                        </Box>
                                                        <Box>
                                                            <Stack direction='column'>
                                                                <Skeleton variant="text" sx={{ fontSize: '1.25rem', marginBottom: '8px' }} />
                                                                <Skeleton variant="text" sx={{ fontSize: '0.75rem', marginBottom: '8px' }} />
                                                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                                                <Stack direction='row' spacing={2} sx={{ margin: '4px 0 0 8px' }}>
                                                                    <Skeleton variant="rounded" width={66} height={25} />
                                                                    <Skeleton variant="rounded" width={66} height={25} />
                                                                </Stack>
                                                            </Stack>
                                                        </Box>
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Stack spacing={15}>
                                                        <Skeleton variant="rounded" width={150} height={18} />
                                                        <Stack direction='row' spacing={2} sx={{ margin: '4px 0 0 8px' }}>
                                                            <Skeleton variant="rounded" width={66} height={25} />
                                                            <Skeleton variant="rounded" width={66} height={25} />
                                                        </Stack>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </MentorDetailsCard>
                                    <MentorDetailsCard sx={{ width: '850px', height: '200px' }} >
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid item xs={9}>
                                                    <Stack direction='row' spacing={2}>
                                                        <Box>
                                                            <MentorProfileImage variant="rounded">
                                                                <Skeleton variant="rounded" width='inherit' height='inherit' />
                                                            </MentorProfileImage>
                                                        </Box>
                                                        <Box>
                                                            <Stack direction='column'>
                                                                <Skeleton variant="text" sx={{ fontSize: '1.25rem', marginBottom: '8px' }} />
                                                                <Skeleton variant="text" sx={{ fontSize: '0.75rem', marginBottom: '8px' }} />
                                                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                                                <Stack direction='row' spacing={2} sx={{ margin: '4px 0 0 8px' }}>
                                                                    <Skeleton variant="rounded" width={66} height={25} />
                                                                    <Skeleton variant="rounded" width={66} height={25} />
                                                                </Stack>
                                                            </Stack>
                                                        </Box>
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Stack spacing={15}>
                                                        <Skeleton variant="rounded" width={150} height={18} />
                                                        <Stack direction='row' spacing={2} sx={{ margin: '4px 0 0 8px' }}>
                                                            <Skeleton variant="rounded" width={66} height={25} />
                                                            <Skeleton variant="rounded" width={66} height={25} />
                                                        </Stack>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </MentorDetailsCard>
                                    <MentorDetailsCard sx={{ width: '850px', height: '200px' }} >
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid item xs={9}>
                                                    <Stack direction='row' spacing={2}>
                                                        <Box>
                                                            <MentorProfileImage variant="rounded">
                                                                <Skeleton variant="rounded" width='inherit' height='inherit' />
                                                            </MentorProfileImage>
                                                        </Box>
                                                        <Box>
                                                            <Stack direction='column'>
                                                                <Skeleton variant="text" sx={{ fontSize: '1.25rem', marginBottom: '8px' }} />
                                                                <Skeleton variant="text" sx={{ fontSize: '0.75rem', marginBottom: '8px' }} />
                                                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                                                <Stack direction='row' spacing={2} sx={{ margin: '4px 0 0 8px' }}>
                                                                    <Skeleton variant="rounded" width={66} height={25} />
                                                                    <Skeleton variant="rounded" width={66} height={25} />
                                                                </Stack>
                                                            </Stack>
                                                        </Box>
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Stack spacing={15}>
                                                        <Skeleton variant="rounded" width={150} height={18} />
                                                        <Stack direction='row' spacing={2} sx={{ margin: '4px 0 0 8px' }}>
                                                            <Skeleton variant="rounded" width={66} height={25} />
                                                            <Skeleton variant="rounded" width={66} height={25} />
                                                        </Stack>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </MentorDetailsCard>
                                </Stack>
                        }

                    </Box>
            }
        </SearchPageContainer>
    )
}

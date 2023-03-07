import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Radio, RadioGroup, DialogTitle, Dialog, DialogActions, DialogContent, Card, Tabs, Tab, Box, styled, Stack, Avatar, Grid, Paper, Button, Typography, Divider, Chip, Skeleton, FormControl, FormLabel, FormControlLabel, CircularProgress } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import image from '../mentorDetsils/mentor.jpg'
import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RatingTab from './Tabs/RatingTab';
import ReviewTab from './Tabs/ReviewTab';
import { useNavigate, useParams } from 'react-router-dom'
import { getMentorDetails } from "../../redux/actions/index"
import axios from 'axios'
import Stripe from '../stripe/Stripe'
import LockClockIcon from '@mui/icons-material/LockClock';


const MentorDetailsContainer = styled(Box)`
background: white;
width: auto;
height: 75rem;
margin: 10px 10px 0 10px;
`

const MentorDetailsBody = styled(Stack)(({ theme }) => ({
    marginTop: '25px',
    [theme.breakpoints.down(626)]: {
        direction: 'column',
    },
}));

const MentorDetailsContainerContent = styled(Box)`
padding: 0 13px;
`

const RoundCard = styled(Box)`
width: 108px;
height: 108px;
border-radius: 50%;
`

const MentorHeaderInfo = styled(Grid)`
// margin-top: -30px;
margin-top: 177px;
`

const MentorNameTitleOnHeader = styled(Box)`
margin-top: 17px;
margin-left: 10px;
`
const HeaderButtons = styled(Stack)`
margin-top: 38px;
`

const MentorBodyInfo = styled(Stack)(({ theme }) => ({
    marginTop: '25px',
    flexDirection: 'row',
    [theme.breakpoints.down(626)]: {
        flexDirection: 'column',
    },
}));

const MentorBodyFirstCard = styled(Box)(({ theme }) => ({
    width: '650px',
    height: '488px',
    background: '#f9f9f9',
    borderRadius: '12px',
    marginRight: '372px',
    [theme.breakpoints.down(1285)]: {
        marginRight: '100px',
    },
    [theme.breakpoints.down('md')]: {

        marginRight: '42px',
    },
    [theme.breakpoints.down(740)]: {

        marginRight: '20px',
    },
    [theme.breakpoints.down('sm')]: {
        margin: '1px 1px 1px 1px',
        width: 'auto',
        marginBottom: '20px'
    },
}));


const MentorBodyFirstCardContent = styled(Stack)`
padding: 10px 20px 10px 20px;
`

const MentorBodySecondCard = styled(Box)(({ theme }) => ({
    width: '450px',
    height: '385px',
    background: '#f9f9f9',
    borderRadius: '12px',
    [theme.breakpoints.down(1285)]: {

    },
    [theme.breakpoints.down(740)]: {

        width: '389px',
    },
    [theme.breakpoints.down('sm')]: {
        margin: '1px 1px 1px 1px',
        width: 'auto',
        marginBottom: '20px'
    },
}));


const MentorBodySecondCardContent = styled(Stack)`
padding: 10px 20px 10px 20px;
`
const SkeletonContainer = styled(Stack)`

`
const MentorFooterInfo = styled(Box)`

`
export default function MentorDetails() {

    const toCamelCase = (text) => {
        return text
            // insert a space between lower & upper
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            // space before last upper in a sequence followed by lower
            .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
            // uppercase the first character
            .replace(/^./, function (str) { return str.toUpperCase(); })
    }

    //
    // const callMentorDetailsPage = () => {
    //     try {
    //         const res = axios.get("http://localhost:3000/mentordetails/:id")
    //     }
    // }
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('accountHolderData')) {
            navigate('/');
        }
    }, []);


    //


    const dispatch = useDispatch();
    const { id } = useParams();

    // const { loading, mentor } = useSelector((state) => state.getMentorDetailsReducers);
    const { mentor } = useSelector((state) => state.getMentorDetailsReducers);
    const { loading, isPaymentSuccessfull, dataAfterClassBooking } = useSelector((state) => state.bookClassReducer);

    // const bookedClassesData = dataAfterBookingClass.bookedClasses.map((data))
    if (dataAfterClassBooking != 'undefined' && dataAfterClassBooking) {
        const bookedClassesData = dataAfterClassBooking.data.dataAfterBookingClass.bookedClasses.map((data) => {
            const mentorId = dataAfterClassBooking.data.dataAfterBookingClass.mentorId;
            // console.log(dataAfterClassBooking.data.dataAfterBookingClass.mentorId)
            const retrievedData = localStorage.getItem('accountHolderData')
            const accountHolderProfileData = JSON.parse(retrievedData)
            // console.log(data.studentData._id)
            if (accountHolderProfileData._id == data.studentData._id)
                data.mentorId = dataAfterClassBooking.data.dataAfterBookingClass.mentorId;
            localStorage.setItem("bookedClasses", JSON.stringify(data));
        })
    }


    // {
    //     mentor[0].interest.map((data, index) => (

    //         <Chip key={index} label={toCamelCase(data)} variant="outlined" sx={{ margin: '2px 2px 2px 2px' }} />

    //     ))

    // }

    //checking verified student who paid
    const [verifiedStudent, setVerifiedStudent] = useState(false);


    useEffect(() => {
        // if (mentor && id !== mentor._id)
        dispatch(getMentorDetails(id));

        // checking verified student who paid
        const mentorId = JSON.parse(localStorage.getItem("bookedClasses")).mentorId;
        // console.log("daddqwdqdqd", mentorId)
        if (id == mentorId) {
            setVerifiedStudent(true);
        }

    }, [])

    console.log(mentor)

    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    // const [isPaymentSuccessfull, setIsPaymentSuccessfull] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const [amountValue, setAmountValue] = useState(0);
    const amountHandleChange = (event) => {
        setAmountValue(event.target.value);
        console.log(amountValue)
    };
    const [subject, setSubject] = useState('');
    const subjectHandleChange = (event) => {
        setSubject(event.target.value);
        console.log(subject)
    };

    const [teachingMode, setTeachingMode] = useState('');
    const modeHandleChange = (event) => {
        setTeachingMode(event.target.value);
        console.log(subject)
    };








    //banner image category
    const [bannerImageCategory, setBannerImageCategory] = useState('');

    //banner image
    const [bannerImage, setBannerImage] = useState('');
    //temp
    const URL = 'https://api.unsplash.com/search/photos?page=1&query=physics&client_id=U4zqZsCHyxq9B7Sf2jTY6BK_PKlH1ROsrHUwA3oBhII'
    fetch(URL)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            // console.log(data.results[0].urls.full)
            setBannerImage(data.results[0].urls.full)
        })

    return (
        <MentorDetailsContainer>
            {
                (mentor && Object.keys(mentor).length) ?
                    <Stack direction="column" spacing={2}>
                        <Box sx={{ background: '#e3e3e3', height: '13rem', width: 'inherit' }} >
                            {/* <img src={bannerImage} alt="d" style={{ height: '13rem', width: '1032px' }} /> */}
                            <MentorDetailsContainerContent>
                                <MentorHeaderInfo container spacing={2}>
                                    <Grid item xs={8}>
                                        <Stack direction='row'>
                                            <Avatar alt='avatar' src={mentor[0].profileimage.url} sx={{ width: '100px', height: '100px', background: 'white' }} />
                                            <MentorNameTitleOnHeader>
                                                <Typography variant="h6">{mentor[0].name}</Typography>
                                                <Typography variant="caption">I am a mentor in agartala</Typography>
                                            </MentorNameTitleOnHeader>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={4}>
                                        {/* <HeaderButtons direction='row' spacing={2}>
                                            <Button variant="outlined" size="small">...</Button>
                                            <Button variant="outlined" size="small">Message</Button>
                                            <Button variant="contained" size="small" startIcon={<AddIcon />}>
                                                Follow
                                            </Button>
                                        </HeaderButtons> */}
                                    </Grid>
                                </MentorHeaderInfo>

                                <MentorBodyInfo>
                                    <MentorBodyFirstCard>
                                        <MentorBodyFirstCardContent spacing={2} divider={<Divider orientation="horizontal" flexItem></Divider>}>
                                            <Box>
                                                <Typography variant="subtitle1">Experience</Typography>
                                                <Typography variant="caption">I am a mentor in agartala</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle1">About Me</Typography>
                                                <Typography variant="caption">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus totam magnam quas error accusantium iure suscipit! Nam, voluptatem! Error sapiente similique provident perspiciatis atque hic itaque dolor ex accusantium ipsa!</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle1">Skills</Typography>
                                                <Stack direction='row' spacing={2}>
                                                    {
                                                        mentor[0].interest.map((data, index) => (

                                                            <Chip key={index} label={toCamelCase(data)} variant="outlined" sx={{ margin: '2px 2px 2px 2px' }} />

                                                        ))

                                                    }

                                                </Stack>
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle1">Mode of teaching</Typography>
                                                {
                                                    mentor[0].mode === 'both' ?
                                                        <Stack direction='row' spacing={2}>
                                                            <Typography variant="caption">Online</Typography>
                                                            <Typography variant="caption">Offline</Typography>
                                                        </Stack>
                                                        :
                                                        <Typography variant="caption">{mentor[0].mode}</Typography>
                                                }
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle1">Price</Typography>
                                                <Stack direction='row' spacing={2}>
                                                    <Chip label={mentor[0].priceperhour + "rs /hour"} sx={{ margin: '2px 2px 2px 2px' }} />
                                                    <Chip label={mentor[0].priceperday + "rs /day"} sx={{ margin: '2px 2px 2px 2px' }} />
                                                </Stack>
                                            </Box>
                                        </MentorBodyFirstCardContent>
                                    </MentorBodyFirstCard>

                                    <MentorBodySecondCard>

                                        {
                                            (verifiedStudent) ?
                                                <MentorBodySecondCardContent spacing={2} >
                                                    <Box>
                                                        <Typography variant="subtitle1">Location</Typography>
                                                        <Button startIcon={<LocationOnIcon />} size='small'>{mentor[0].address}</Button>
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="subtitle1">Email</Typography>
                                                        <Typography variant="caption">{mentor[0].email}</Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="subtitle1">Price</Typography>
                                                        <Stack direction='row' spacing={2}>
                                                            <Chip label={mentor[0].priceperhour + "rs /hour"} sx={{ margin: '2px 2px 2px 2px' }} />
                                                            <Chip label={mentor[0].priceperday + "rs /day"} sx={{ margin: '2px 2px 2px 2px' }} />
                                                        </Stack>
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="subtitle1">Mode of teaching</Typography>
                                                        {
                                                            mentor[0].mode === 'both' ?
                                                                <Stack direction='row' spacing={2}>
                                                                    <Typography variant="caption">Online</Typography>
                                                                    <Typography variant="caption">Offline</Typography>
                                                                </Stack>
                                                                :
                                                                <Typography variant="caption">{mentor[0].mode}</Typography>
                                                        }
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="subtitle1">Mobile Number</Typography>
                                                        <Typography variant="caption">{mentor[0].phonenumber}</Typography>
                                                    </Box>
                                                </MentorBodySecondCardContent> :
                                                <MentorBodySecondCardContent>
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '140px' }}>
                                                        {
                                                            (loading) ?
                                                                <CircularProgress /> :
                                                                <Stack spacing={2}>
                                                                    <LockClockIcon sx={{ fontSize: '2.5rem', marginLeft: '26px' }} />

                                                                    <Button size='large' onClick={handleClickOpen}>
                                                                        <Typography >Book a class</Typography>
                                                                    </Button>
                                                                </Stack>
                                                        }

                                                    </Box>
                                                    <Dialog
                                                        fullScreen={fullScreen}
                                                        open={openDialog}
                                                        onClose={handleClose}
                                                        aria-labelledby="responsive-dialog-title"
                                                    >
                                                        <DialogTitle id="responsive-dialog-title">
                                                            {"Choose class details for payment"}
                                                        </DialogTitle>
                                                        <DialogContent>
                                                            <Stack>
                                                                <FormControl>
                                                                    <FormLabel id="demo-controlled-radio-buttons-group">Choose Payment</FormLabel>
                                                                    <RadioGroup
                                                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                                                        name="controlled-radio-buttons-group"
                                                                        value={amountValue}
                                                                        onChange={amountHandleChange}
                                                                    >
                                                                        <FormControlLabel value={mentor[0].priceperhour} control={<Radio />} label={mentor[0].priceperhour + "rs /hour"} />
                                                                        <FormControlLabel value={mentor[0].priceperday} control={<Radio />} label={mentor[0].priceperday + "rs /day"} />
                                                                    </RadioGroup>
                                                                </FormControl>

                                                                <FormControl>
                                                                    <FormLabel id="demo-controlled-radio-buttons-group">Choose Subject</FormLabel>
                                                                    <RadioGroup
                                                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                                                        name="controlled-radio-buttons-group"
                                                                        value={subject}
                                                                        onChange={subjectHandleChange}
                                                                    >
                                                                        {
                                                                            mentor[0].interest.map((data, index) => (
                                                                                <FormControlLabel value={data} control={<Radio />} label={data} />
                                                                            ))

                                                                        }
                                                                    </RadioGroup>
                                                                </FormControl>

                                                                <FormControl>
                                                                    <FormLabel id="demo-controlled-radio-buttons-group">Choose Mode</FormLabel>
                                                                    <RadioGroup
                                                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                                                        name="controlled-radio-buttons-group"
                                                                        value={teachingMode}
                                                                        onChange={modeHandleChange}
                                                                    >
                                                                        {
                                                                            mentor[0].mode === 'both' ?
                                                                                <Stack direction='row' spacing={2}>
                                                                                    <FormControlLabel value='online' control={<Radio />} label='Online' />
                                                                                    <FormControlLabel value='offline' control={<Radio />} label='Offline' />
                                                                                    {/* <Typography variant="caption">Online</Typography>
                                                                                    <Typography variant="caption">Offline</Typography> */}
                                                                                </Stack>
                                                                                :
                                                                                <Stack>
                                                                                    <FormControlLabel value='online' control={<Radio />} label='Online' />
                                                                                    <FormControlLabel value='offline' control={<Radio />} label='Offline' />
                                                                                    <FormControlLabel value='both' control={<Radio />} label='Both' />
                                                                                </Stack>
                                                                        }
                                                                    </RadioGroup>
                                                                </FormControl>

                                                            </Stack>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Box onClick={handleClose}>
                                                                <Stripe amount={amountValue} mentorData={mentor} classDetails={{ subject, teachingMode }} />
                                                            </Box>
                                                            {/* <Button autoFocus onClick={handleClose}>
                                                                Continue
                                                            </Button> */}
                                                            <Button onClick={handleClose} autoFocus>
                                                                Cancle
                                                            </Button>
                                                        </DialogActions>
                                                    </Dialog>

                                                </MentorBodySecondCardContent>
                                        }

                                    </MentorBodySecondCard>

                                </MentorBodyInfo>

                                <MentorFooterInfo>
                                    <TabContext value={value}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <TabList aria-label='Tabs Example' onChange={handleChange}>
                                                <Tab label="Rating & Review" value='1' />
                                                <Tab label="Rate This Mentor" value='2' />
                                            </TabList>
                                        </Box>
                                        <TabPanel value='1'>
                                            <RatingTab />
                                        </TabPanel>
                                        <TabPanel value='2'>
                                            <ReviewTab />
                                        </TabPanel>
                                    </TabContext>
                                </MentorFooterInfo>
                            </MentorDetailsContainerContent>
                        </Box>
                    </Stack> :
                    <SkeletonContainer direction="column" spacing={2}>

                        <Box sx={{ background: '#e3e3e3', height: '13rem', width: 'inherit' }} >
                            <MentorDetailsContainerContent>
                                <MentorHeaderInfo container spacing={2}>
                                    <Grid item xs={8}>
                                        <Stack direction='row'>
                                            <Skeleton variant="circular" animation="wave" sx={{ width: '100px', height: '100px' }} />
                                            <MentorNameTitleOnHeader>
                                                <Skeleton variant="rounded" sx={{ width: '130px', height: '17px', marginBottom: "10px" }} />
                                                <Skeleton variant="rounded" sx={{ width: '210px', height: '17px' }} />
                                            </MentorNameTitleOnHeader>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <HeaderButtons direction='row' spacing={2}>
                                            <Skeleton variant="rounded" sx={{ width: '64px', height: '28px' }} />
                                            <Skeleton variant="rounded" sx={{ width: '64px', height: '28px' }} />
                                            <Skeleton variant="rounded" sx={{ width: '64px', height: '28px' }} />
                                        </HeaderButtons>
                                    </Grid>
                                </MentorHeaderInfo>
                                <MentorBodyInfo container spacing={2}>
                                    <Grid item xs={8}>
                                        <MentorBodyFirstCard>
                                            <MentorBodyFirstCardContent spacing={2} divider={<Divider orientation="horizontal" flexItem></Divider>}>
                                                <Box>
                                                    <Skeleton variant="rectangular" sx={{ width: '150px', height: '21px', marginBottom: "10px" }} />
                                                    <Skeleton variant="rectangular" sx={{ width: '200px', height: '14px' }} />
                                                </Box>
                                                <Box>
                                                    <Skeleton variant="rectangular" sx={{ width: '87px', height: '21px', marginBottom: "10px" }} />
                                                    <Skeleton variant="rectangular" sx={{ width: '510px', height: '200px' }} />
                                                </Box>
                                            </MentorBodyFirstCardContent>
                                        </MentorBodyFirstCard>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <MentorBodySecondCard>
                                            <MentorBodySecondCardContent spacing={2} >
                                                <Box>
                                                    <Skeleton variant="rectangular" sx={{ width: '90px', height: '25px', marginBottom: "10px" }} />
                                                    <Stack direction='row'>
                                                        <Skeleton variant="rounded" sx={{ width: '82px', height: '20px', margin: '2px 2px 2px 2px' }} />
                                                        <Skeleton variant="rounded" sx={{ width: '82px', height: '20px', margin: '2px 2px 2px 2px' }} />
                                                        <Skeleton variant="rounded" sx={{ width: '82px', height: '20px', margin: '2px 2px 2px 2px' }} />
                                                    </Stack>
                                                </Box>
                                                <Box>
                                                    <Skeleton variant="rectangular" sx={{ width: '110px', height: '22px', marginBottom: "10px" }} />
                                                    <Skeleton variant="rectangular" sx={{ width: '173px', height: '17px', marginBottom: "10px", marginLeft: '34px' }} />
                                                </Box>
                                                <Box>
                                                    <Skeleton variant="rectangular" sx={{ width: '110px', height: '22px', marginBottom: "10px" }} />
                                                    <Skeleton variant="rectangular" sx={{ width: '173px', height: '17px', marginBottom: "10px" }} />
                                                </Box>
                                                <Box>
                                                    <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', marginTop: "10px" }}>
                                                        <Skeleton variant="rounded" sx={{ width: '64px', height: '28px' }} />
                                                        <Skeleton variant="rounded" sx={{ width: '64px', height: '28px' }} />
                                                    </Stack>
                                                </Box>
                                            </MentorBodySecondCardContent>
                                        </MentorBodySecondCard>
                                    </Grid>
                                </MentorBodyInfo>
                            </MentorDetailsContainerContent>
                        </Box>
                    </SkeletonContainer>
            }
        </MentorDetailsContainer>
    )
}

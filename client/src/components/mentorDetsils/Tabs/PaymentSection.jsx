import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Radio, RadioGroup, DialogTitle, Dialog, DialogActions, DialogContent, Card, Tabs, Tab, Box, styled, Stack, Avatar, Grid, Paper, Button, Typography, Divider, Chip, Skeleton, FormControl, FormLabel, FormControlLabel, CircularProgress } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Stripe from '../../stripe/Stripe'
import LockClockIcon from '@mui/icons-material/LockClock';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate, useParams } from 'react-router-dom'

import location from './Icons/location.png'
import email from './Icons/email.png'
import price from './Icons/money.png'
import teaching from './Icons/teacher.png'
import phone from './Icons/phone.png'




const SecondCardContent = styled(Stack)`
padding: 10px 20px 10px 20px;
`
const Icon = styled('img')(({ theme }) => ({
    height: '37px',
    marginTop: '3px'

}));


export default function PaymentSection(props) {

    const dispatch = useDispatch();
    const { id } = useParams();

    const { mentor } = useSelector((state) => state.getMentorDetailsReducers);
    const { loading, isPaymentSuccessfull, dataAfterClassBooking } = useSelector((state) => state.bookClassReducer);

    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    // const [isPaymentSuccessfull, setIsPaymentSuccessfull] = useState(false);
    // const [openDialog, setOpenDialog] = useState(false);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    // const handleClickOpen = () => {
    //     setOpenDialog(true);
    // };

    const handleClose = () => {
        props.openDialog = false;
    };

    const [amountValue, setAmountValue] = useState(1);
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


    const [verifiedStudent, setVerifiedStudent] = useState(false);
    useEffect(() => {
        // dispatch(getMentorDetails(id));
        const bookedClassData = JSON.parse(localStorage.getItem("bookedClasses"));
        // const mentorId = JSON.parse(localStorage.getItem("bookedClasses")).mentorId;
        // console.log("daddqwdqdqd", mentorId)
        if (bookedClassData && id == bookedClassData.mentorId) {

            // console.log("hi from md verieft")
            setVerifiedStudent(true);
            console.log(verifiedStudent)
        }
    }, [id, loading])

    console.log(verifiedStudent)

    return (
        <>
            {
                (verifiedStudent) ?
                    <SecondCardContent>
                        <Box sx={{ background: 'whitesmoke', borderRadius: '20px', padding: '10px', marginBottom: '13px' }}>
                            <Stack direction='row' spacing={1.5}>

                                <Icon src={location} alt="location" />
                                <Stack>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '15px' }}>Location</Typography>
                                    <Typography sx={{ fontSize: '14px', fontFamily: 'system-ui' }}>{mentor[0].address}</Typography>
                                </Stack>
                            </Stack>
                        </Box>

                        <Box sx={{ background: 'whitesmoke', borderRadius: '20px', padding: '10px', marginBottom: '13px' }}>
                            <Stack direction='row' spacing={1.5}>

                                <Icon src={email} alt="location" />
                                <Stack>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '15px' }}>Email</Typography>
                                    <Typography variant="caption" sx={{ fontSize: '14px', fontFamily: 'system-ui' }}>{mentor[0].email}</Typography>
                                </Stack>
                            </Stack>

                        </Box>

                        <Box sx={{ background: 'whitesmoke', borderRadius: '20px', padding: '10px', marginBottom: '13px' }}>
                            <Stack direction='row' spacing={1.5}>

                                <Icon src={price} alt="location" />
                                <Stack>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '15px' }}>Price</Typography>
                                    <Stack direction='row' spacing={2}>
                                        <Chip label={mentor[0].priceperhour + "rs /hour"} sx={{ margin: '2px 2px 2px 2px', fontSize: '14px', fontFamily: 'system-ui' }} />
                                        <Chip label={mentor[0].priceperday + "rs /day"} sx={{ margin: '2px 2px 2px 2px', fontSize: '14px', fontFamily: 'system-ui' }} />
                                    </Stack>
                                </Stack>
                            </Stack>

                        </Box>

                        <Box sx={{ background: 'whitesmoke', borderRadius: '20px', padding: '10px', marginBottom: '13px' }}>
                            <Stack direction='row' spacing={1.5}>

                                <Icon src={teaching} alt="location" />
                                <Stack>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '15px' }}>Mode of teaching</Typography>
                                    {
                                        mentor[0].mode === 'both' ?
                                            <Stack direction='row' spacing={2}>
                                                <Typography variant="caption" sx={{ fontSize: '14px', fontFamily: 'system-ui' }}>Online</Typography>
                                                <Typography variant="caption" sx={{ fontSize: '14px', fontFamily: 'system-ui' }}>Offline</Typography>
                                            </Stack>
                                            :
                                            <Typography variant="caption" sx={{ textTransform: 'capitalize', fontSize: '14px', fontFamily: 'system-ui' }}>{mentor[0].mode}</Typography>
                                    }
                                </Stack>
                            </Stack>

                        </Box>

                        <Box sx={{ background: 'whitesmoke', borderRadius: '20px', padding: '10px', marginBottom: '13px' }}>
                            <Stack direction='row' spacing={1.5}>

                                <Icon src={phone} alt="location" />
                                <Stack>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '15px' }}>Mobile Number</Typography>
                                    <Typography variant="caption" sx={{ fontSize: '14px', fontFamily: 'system-ui' }}>{mentor[0].phonenumber}</Typography>
                                </Stack>
                            </Stack>

                        </Box>

                    </SecondCardContent> :
                    <SecondCardContent>




                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '140px' }}>
                            {
                                (loading) ?
                                    <CircularProgress /> :
                                    <Stack spacing={2}>
                                        <LockClockIcon sx={{ fontSize: '2.5rem', marginLeft: '26px' }} />

                                        <Button size='large' onClick={props.handleClickOpen}>
                                            <Typography >Book a class</Typography>
                                        </Button>
                                    </Stack>
                            }

                        </Box>
                        <Dialog
                            fullScreen={fullScreen}
                            open={props.openDialog}
                            onClose={props.handleClose}
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

                                            onChange={amountHandleChange}
                                            value={amountValue}
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
                                <Box onClick={props.handleClose}>
                                    <Stripe amount={amountValue} mentorData={mentor} classDetails={{ subject, teachingMode }} />
                                </Box>
                                {/* <Button autoFocus onClick={handleClose}>
                                                                Continue
                                                            </Button> */}
                                <Button onClick={props.handleClose} autoFocus>
                                    Cancle
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </SecondCardContent >
            }
        </>
    )
}

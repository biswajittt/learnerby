import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRatingReviewData } from "../../../redux/actions/ratingReviewAction"
import { useNavigate, useParams } from 'react-router-dom'
import { SwipeableDrawer, TextField, Container, Box, Card, Typography, styled, Stack, Divider, List, Rating, Button } from '@mui/material'
import { sendRatingAndReview } from '../../../service/api';




const RatingReviewCard = styled(Box)(({ theme }) => ({
    // display: 'flex',
    // justifyContent: 'center'
    // [theme.breakpoints.down(626)]: {
    //     direction: 'column',
    // },
}));
const RatingReviewCardStack = styled(Stack)(({ theme }) => ({

    justifyContent: 'center',
    [theme.breakpoints.down(493)]: {
        flexDirection: 'column',
    },
}));
const ReviewTextFiled = styled(TextField)(({ theme }) => ({
    width: '400px',
    [theme.breakpoints.down(493)]: {
        width: '100%',
        marginBottom: '10px'
    },
}));
const RatingDataCard = styled(Container)(({ theme }) => ({
    marginTop: '10px',
    marginBottom: '10px',
    maxWidth: "sm",
    // [theme.breakpoints.down(626)]: {
    //     direction: 'column',
    // },
}));
const RatingCard = styled(Card)(({ theme }) => ({
    padding: '10px',
    marginBottom: '100px'
    // [theme.breakpoints.down(626)]: {
    //     direction: 'column',
    // },
}));
const ReviewText = styled(Container)(({ theme }) => ({
    padding: '7px',
    borderRadius: '8px',
    background: '#ededed'
    // [theme.breakpoints.down(626)]: {
    //     direction: 'column',
    // },
}));


const initialRatingAndReviewData = {
    mentorId: '',
    studentId: '',
    studentName: '',
    ratingValue: 0,
    reviewText: ''
}



export default function ReviewTab() {

    const dispatch = useDispatch();
    const { id } = useParams();

    //for checking review rating is succesfull or not
    const [ratingReviewSuccessfull, setRatingReviewSuccessfull] = useState(0);

    useEffect(() => {
        // if (mentor && id !== mentor._id)
        dispatch(getRatingReviewData(id));


        // if (ratingReviewData && ratingReviewData !== 'undefined' && ratingReviewData.data.length != 0 && ratingReviewData.data[0].ratingandreview != 'undefined') {
        //     setRatingReviewSuccessfull((ratingReviewData.data[0].ratingandreview).map((data) => {
        //         if (accountHolderData._id == data.studentId) {
        //             forRefresh = 1;
        //             return data;
        //             // setRatingReviewSuccessfull(data);
        //         } else {
        //             forRefresh = 0;
        //         }
        //     }))
        //     // console.log(currentStudentReviewData)
        //     // setRatingReviewSuccessfull(currentStudentReviewData);

        // }

        const ratingdata = localStorage.getItem("com.learnerby.rating")
        if (ratingdata) {

            setRatingReviewSuccessfull(JSON.parse(ratingdata))
        }

    }, [id, dispatch])


    const { mentor } = useSelector((state) => state.getMentorDetailsReducers)

    const { loading, ratingReviewData } = useSelector((state) => state.ratingReviewReducer)


    ///send prating and review
    const [studentRatingReviewData, setStudentRatingReviewData] = useState(initialRatingAndReviewData);

    const [ratingvalue, setRatingValue] = useState(0);

    const changeRatingValue = (event, newValue) => {
        setRatingValue(newValue);
        setStudentRatingReviewData({ ...studentRatingReviewData, [event.target.name]: ratingvalue })
        // console.log(ratingReviewData)
        // console.log(ratingvalue)
    }

    const onInputChange = (event) => {
        setStudentRatingReviewData({ ...studentRatingReviewData, [event.target.name]: event.target.value })
        // console.log(ratingReviewData)
    }


    let accountHolderData = 0;
    if (localStorage.getItem('accountHolderData')) {
        accountHolderData = JSON.parse(localStorage.getItem('accountHolderData'))
    }

    const submitRatingAndReview = async () => {
        console.log(studentRatingReviewData)
        studentRatingReviewData.ratingValue = ratingvalue;

        studentRatingReviewData.mentorId = window.location.pathname.split("/mentordetails/")[1];
        studentRatingReviewData.studentId = accountHolderData._id;
        studentRatingReviewData.studentName = accountHolderData.name;
        console.log(studentRatingReviewData)
        // console.log(window.location.pathname.split("/mentordetails/")[1])
        let response = await sendRatingAndReview(studentRatingReviewData);
        if (!response) return;
        console.log("edededde", response)
        console.log("edededde", response.data.result.mentorId)
        if (response.status == 200) {

            // setRatingReviewSuccessfull(1);

            console.log(response.data.result.ratingandreview)
            const allRatingReviewData = response.data.result.ratingandreview;
            const studentId = accountHolderData._id;
            const mentorId = response.data.result.mentorId;
            allRatingReviewData.map((data) => {
                if (data.studentId === studentId && mentorId == id) {
                    const currentStudentReviewData = data;
                    currentStudentReviewData.mentorId = mentorId;
                    localStorage.setItem("com.learnerby.rating", JSON.stringify(currentStudentReviewData))
                    // console.log("review", data)
                    // const ratingdata = localStorage.getItem("com.learnerby.rating")
                    setRatingReviewSuccessfull(currentStudentReviewData);
                }
            })
        }
    }

    // const accountHolderData = JSON.parse(localStorage.getItem('accountHolderData'))
    // console.log(accountHolderData._id)

    //checking current user give review or not


    // if (ratingReviewData && ratingReviewData !== 'undefined' && ratingReviewData.data.length != 0 && ratingReviewData.data[0].ratingandreview != 'undefined') {
    //     const currentStudentReviewData = (ratingReviewData.data[0].ratingandreview).map((data) => {
    //         if (accountHolderData._id == data.studentId) {
    //             return data;
    //             // setRatingReviewSuccessfull(data);
    //         }
    //     })
    //     console.log(currentStudentReviewData)
    //     // setRatingReviewSuccessfull(currentStudentReviewData);
    // }

    console.log("data fro storage", ratingReviewSuccessfull)




    return (
        <Container>

            <RatingReviewCard>
                {
                    (ratingReviewSuccessfull != 0 && id == ratingReviewSuccessfull.mentorId) ?
                        <Container>
                            <Card sx={{ padding: '10px' }}>
                                <Stack spacing={1}>
                                    <Stack direction='row' spacing={1} >
                                        <Typography sx={{ fontWeight: '600' }}>You</Typography>
                                        <Typography sx={{ fontWeight: 'bold' }}>.</Typography>
                                        <Typography sx={{ fontSize: '16px', opacity: '60%' }}>{new Date(ratingReviewSuccessfull.reviewed_on).toDateString()}</Typography>
                                        <Rating name="read-only" value={ratingReviewSuccessfull.ratingValue} readOnly sx={{ background: '#f1f1f1', borderRadius: '10px', padding: '2px' }} />
                                    </Stack>

                                    <ReviewText>
                                        <Typography>{ratingReviewSuccessfull.reviewText}</Typography>
                                    </ReviewText>
                                </Stack>
                            </Card>
                        </Container> :
                        <Container>
                            <RatingReviewCardStack direction='row'
                                sx={(theme) => ({
                                    [theme.breakpoints.up(493)]: {

                                    },
                                })}
                            >
                                <Rating
                                    name="ratingValue"
                                    value={ratingvalue}
                                    onChange={changeRatingValue}
                                    sx={{ background: '#dfdfdf', borderRadius: '16px', padding: '5px 10px 5px 10px', marginTop: '18px', marginRight: '10px' }}
                                />
                                <ReviewTextFiled
                                    name='reviewText'
                                    id="filled-password-input"
                                    label="Enter your feedback"
                                    type="text"
                                    autoComplete="current-password"
                                    variant="standard"
                                    onChange={onInputChange}
                                />
                                <Button onClick={submitRatingAndReview}
                                    sx={{ marginTop: '18px', marginLeft: '10px', background: '#262626', color: 'white', borderRadius: '16px', height: '34px', ":hover": { backgroundColor: 'none' } }}
                                >
                                    Submit
                                </Button>
                            </RatingReviewCardStack>
                        </Container>

                }
            </RatingReviewCard>

            {
                (ratingReviewData && ratingReviewData !== 'undefined' && ratingReviewData.data.length != 0 && ratingReviewData.data[0].ratingandreview != 'undefined') ?
                    < List

                        sx={{
                            width: '100%',
                            maxWidth: 'auto',
                            bgcolor: 'background.paper',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 300,
                            '& ul': { padding: 0 },
                        }}>
                        {
                            // (ratingReviewData.data[0].ratingandreview).forEach((data, index) => {
                            //     <div>{data}</div>
                            // })
                            (ratingReviewData.data[0].ratingandreview).map((data, index) => (
                                // <Typography key={index}>{data.reviewText}</Typography>

                                <RatingDataCard key={index}>

                                    {
                                        (accountHolderData && (data.studentId !== accountHolderData._id)) ?
                                            <RatingCard >
                                                <Stack spacing={1}>
                                                    <Stack direction='row' spacing={1} >
                                                        <Typography sx={{ fontWeight: '600' }}>{data.studentName}</Typography>
                                                        <Typography sx={{ fontWeight: 'bold' }}>.</Typography>
                                                        <Typography sx={{ fontSize: '16px', opacity: '60%' }}>{new Date(data.reviewed_on).toDateString()}</Typography>
                                                        <Rating name="read-only" value={data.ratingValue} readOnly sx={{ background: '#f1f1f1', borderRadius: '10px', padding: '2px' }} />
                                                    </Stack>

                                                    <ReviewText>
                                                        <Typography>{data.reviewText}</Typography>
                                                    </ReviewText>
                                                </Stack>
                                            </RatingCard> :
                                            null
                                    }

                                </RatingDataCard>

                            ))

                        }
                    </List> : null

                // <Typography sx={{ display: 'flex', justifyContent: 'center', fontSize: '17px', fontWeight: 'bold', marginTop: '90px' }}>
                //     Be the first to review
                // </Typography>

            }
        </Container>
    )
}

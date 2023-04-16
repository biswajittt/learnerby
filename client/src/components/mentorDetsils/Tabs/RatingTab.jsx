import { Card, Container, Box, Button, Rating, Stack, TextField, styled, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { sendRatingAndReview } from '../../../service/api';



const RatingAndReview = styled(Card)(({ theme }) => ({
    marginTop: '38px',
    height: '204px',
}));
const RatingAndReviewContainer = styled(Stack)(({ theme }) => ({
    alignItems: 'center',
    margin: '12px 0px 12px 0px',
}));

const RatingAndReviewData = styled(Stack)(({ theme }) => ({
    alignItems: 'center',

}));

const ReviewTextFiled = styled(TextField)(({ theme }) => ({
    width: '400px',
    [theme.breakpoints.down(1285)]: {

    },
}));

const ReviewAndButtonContainer = styled(Stack)(({ theme }) => ({

}));

const initialRatingAndReviewData = {
    mentorId: '',
    studentId: '',
    studentName: '',
    ratingValue: 0,
    reviewText: ''
}

export default function RatingTab() {

    const dispatch = useDispatch();

    const [ratingReviewData, setRatingReviewData] = useState(initialRatingAndReviewData);

    const [ratingvalue, setRatingValue] = useState(0);

    const changeRatingValue = (event, newValue) => {
        setRatingValue(newValue);
        setRatingReviewData({ ...ratingReviewData, [event.target.name]: ratingvalue })
        // console.log(ratingReviewData)
        // console.log(ratingvalue)
    }

    const onInputChange = (event) => {
        setRatingReviewData({ ...ratingReviewData, [event.target.name]: event.target.value })
        // console.log(ratingReviewData)
    }


    const [ratingReviewSuccessfull, setRatingReviewSuccessfull] = useState(0);

    const submitRatingAndReview = async () => {
        console.log(ratingReviewData)
        // ratingReviewData.ratingValue = ratingvalue;
        // const accountHolderData = JSON.parse(localStorage.getItem('accountHolderData'))
        // ratingReviewData.mentorId = window.location.pathname.split("/mentordetails/")[1];
        // ratingReviewData.studentId = accountHolderData._id;
        // ratingReviewData.studentName = accountHolderData.name;
        // console.log(ratingReviewData)
        // // console.log(window.location.pathname.split("/mentordetails/")[1])
        // let response = await sendRatingAndReview(ratingReviewData);
        // if (!response) return;
        // console.log("edededde", response)
        // if (response.status == 200) {


        //     console.log(response.data.result.ratingandreview)
        //     const allRatingReviewData = response.data.result.ratingandreview;
        //     const studentId = accountHolderData._id;
        //     allRatingReviewData.map((data) => {
        //         if (data.studentId === studentId) {
        //             localStorage.setItem("com.learnerby.rating", JSON.stringify(data))
        //             // console.log("review", data)
        //             const ratingdata = localStorage.getItem("com.learnerby.rating")
        //             setRatingReviewSuccessfull(JSON.parse(ratingdata));
        //         }
        //     })
        // }

        //// dispatch(userInfoAfterRegistration(registrationData));
    }


    useEffect(() => {
        // if (mentor && id !== mentor._id)
        if (localStorage.getItem("com.learnerby.rating")) {
            setRatingReviewSuccessfull(JSON.parse(localStorage.getItem("com.learnerby.rating")));
        }
    }, [])

    return (
        <Container>
            <RatingAndReview>
                {
                    (ratingReviewSuccessfull != 0) ?
                        <RatingAndReviewContainer spacing={2}>
                            <Rating
                                name="ratingValue"
                                value={ratingvalue}
                                onChange={changeRatingValue}
                            />
                            <ReviewAndButtonContainer direction='row' spacing={3}>
                                <ReviewTextFiled
                                    name='reviewText'
                                    id="filled-password-input"
                                    label="Review"
                                    type="text"
                                    autoComplete="current-password"
                                    variant="filled"
                                    onChange={onInputChange}
                                />
                                <Button onClick={submitRatingAndReview}>Submit</Button>
                            </ReviewAndButtonContainer>
                        </RatingAndReviewContainer> :
                        <RatingAndReviewData>
                            <Rating name="read-only" value={ratingReviewSuccessfull.ratingValue} readOnly />
                        </RatingAndReviewData>
                }

            </RatingAndReview>
        </Container>
    )
}

import { Box, Button, Rating, Stack, TextField, styled } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { sendRatingAndReview } from '../../../service/api';


const RatingAndReview = styled(Box)(({ theme }) => ({

}));
const RatingAndReviewContainer = styled(Stack)(({ theme }) => ({

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
    userId: '',
    ratingValue: '0',
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
    }

    const onInputChange = (event) => {
        setRatingReviewData({ ...ratingReviewData, [event.target.name]: event.target.value })
        // console.log(ratingReviewData)
    }

    const submitRatingAndReview = async () => {
        const accountHolderData = JSON.parse(localStorage.getItem('accountHolderData'))
        ratingReviewData.mentorId = window.location.pathname.split("/mentordetails/")[1];
        ratingReviewData.userId = accountHolderData._id;
        console.log(ratingReviewData)
        // console.log(window.location.pathname.split("/mentordetails/")[1])
        let response = await sendRatingAndReview(ratingReviewData);
        if (!response) return;
        console.log(response)

        // dispatch(userInfoAfterRegistration(registrationData));
    }

    return (
        <RatingAndReview>
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
            </RatingAndReviewContainer>
        </RatingAndReview>
    )
}

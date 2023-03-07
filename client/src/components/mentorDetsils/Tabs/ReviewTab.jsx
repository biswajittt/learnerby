import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMentorDetails } from "../../../redux/actions/index"
import { useNavigate, useParams } from 'react-router-dom'

export default function ReviewTab() {

    const dispatch = useDispatch();
    const { id } = useParams();

    const { loading, mentor } = useSelector((state) => state.getMentorDetailsReducers)

    // useEffect(() => {
    //     // if (mentor && id !== mentor._id)
    //     dispatch(getMentorDetails(id));

    // }, [])

    console.log(mentor)
    console.log(mentor[0].ratingandreview)
    let getReviewAndRating = mentor[0].ratingandreview;
    console.log(Object.keys(getReviewAndRating)[0])
    return (
        <>
            {/* <div>{getReviewAndRating.map((data) => {
            <div>{data.reviewText}</div>
        })}</div> */}
            <div>
                dfdfdf
                {
                    Object.keys(getReviewAndRating).map((key, index) => {
                        <div>hi{(getReviewAndRating)[0]}</div>
                    })
                }
            </div>
        </>
    )
}

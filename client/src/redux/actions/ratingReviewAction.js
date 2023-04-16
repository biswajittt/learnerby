import axios from "axios"

const URL = "http://localhost:8000";

export const getRatingReviewData = (mentorId) => async (dispatch) => {
    dispatch({
        type: 'RATING_REVIEW_REQUEST',
    })
    try {

        const data = await axios.get(`${URL}/reviewandratingdata`, {
            params: {
                mentorId
            }
        });
        console.log("inside1", data)
        dispatch({
            type: 'RATING_REVIEW_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({
            type: 'RATING_REVIEW_FAIL',
            payload: error.message
        })
        console.log("error while calling", error.message)
    }
}
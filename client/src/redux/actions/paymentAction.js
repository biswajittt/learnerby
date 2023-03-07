import axios from "axios"
const URL = "http://localhost:8000";

export const bookClass = (mentorId, token, amount, mentorData, classDetails) => async (dispatch, getState) => {
    dispatch({
        type: 'BOOK_CLASS_REQUEST',
    })
    const currentUser = JSON.parse(localStorage.getItem("accountHolderData"))
    try {
        const res = await axios.post(`${URL}/api/payment/bookclass`, { mentorId, token, amount, currentUser, mentorData, classDetails });
        dispatch({
            type: 'BOOK_CLASS_SUCCESS',
            payload: res
        })
        console.log(res)
    } catch (error) {
        dispatch({ type: 'BOOK_CLASS_FAIL', })
        console.log(error)
    }
}
import axios from "axios"
const URL = "http://localhost:8000";

export const fetchMentorConnections = (id) => async (dispatch, getState) => {
    dispatch({
        type: 'CONNECTION_REQUEST_SENT',
    })
    try {
        console.log(id)
        const res = await axios.post(`${URL}/mentor/dashboard/fetchconnections`, { id });
        dispatch({
            type: 'CONNECTION_REQUEST_SENT_SUCCESS',
            payload: res
        })
        console.log(res)
    } catch (error) {
        dispatch({ type: 'CONNECTION_REQUEST_FAIL', })
        console.log(error)
    }
}

// export const fetchConnectionStatus = (mentorId, studentId) => async (dispatch, getState) => {
//     dispatch({
//         type: 'CONNECTION_REQUEST_ACCEPTING',
//     })
//     try {
//         console.log(mentorId, studentId)
//         const res = await axios.post(`${URL}/mentor/dashboard/fetchconnectionstatus`, { mentorId, studentId });
//         dispatch({
//             type: 'CONNECTION_STATUS_SUCCESS',
//             payload: res
//         })
//         console.log(res)
//     } catch (error) {
//         dispatch({ type: 'CONNECTION_STATUS_FAIL', })
//         console.log(error)
//     }
// }
// import axios from "axios"
// import * as actionTypes from "../constants/mentorConstants"

// const URL = "http://localhost:8000";


// export const getMentorsData = () => async (dispatch) => {
//     try {
//         const { data } = await axios.get(`${URL}/allMentorsdata`);
//         console.log("Hi data", data)
//         dispatch({
//             type: actionTypes.GET_MENTOR_SUCCESS,
//             payload: data
//         })

//     } catch (error) {
//         dispatch({
//             type: actionTypes.GET_MENTOR_FAIL,
//             payload: error.message
//         })
//         console.log("error while calling", error.message)
//     }
// }
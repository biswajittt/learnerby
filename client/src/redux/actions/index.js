import * as actionTypes from "../constants/mentorConstants"
import axios from "axios"

const URL = "http://localhost:8000";


export const mentorInfoAfterRegistration = (data) => {
    return {
        type: actionTypes.Mentor_Info_After_Registration,
        data: data
    }
}

export const userInfoAfterRegistration = (data) => {
    return {
        type: actionTypes.User_Info_After_Registration,
        data: data
    }
}
export const userInfoAfterLogin = (data) => {
    return {
        type: actionTypes.User_Info_After_Login,
        data: data
    }
}

export const getMentorsData = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${URL}/allMentorsdata`);
        console.log("Hi data", data)
        dispatch({
            type: actionTypes.GET_MENTOR_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_MENTOR_FAIL,
            payload: error.message
        })
        console.log("error while calling", error.message)
    }
}


export const getMentorDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_MENTOR_DETIALS_REQUEST });

        const { data } = await axios.get(`${URL}/mentordetails/${id}`);
        dispatch({
            type: actionTypes.GET_MENTOR_DETIALS_REQUEST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_MENTOR_DETIALS_REQUEST_FAIL,
            payload: error.message
        })
        console.log("error while calling", error.message)
    }
}

export const getMentorsDataBySearchQuery = (searchQuery) => async (dispatch) => {
    try {
        console.log("from action: ", searchQuery)
        // console.log(`${URL}/searchpage/searchquery/${searchQuery['searchquery']}`)
        dispatch({ type: actionTypes.GET_MENTOR_DETIAL_BY_SEARCH_QUERY_REQUEST });

        const { data } = await axios.get(`${URL}/searchpage/searchquery/${searchQuery}`);

        dispatch({
            type: actionTypes.GET_MENTOR_DETIAL_BY_SEARCH_QUERY_REQUEST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_MENTOR_DETIAL_BY_SEARCH_QUERY_REQUEST_FAIL,
            payload: error.message
        })
        console.log("error while calling", error.message)
    }
}

// export const getUserProfile = (id) => async (dispatch) => {
//     try {
//         // console.log("from action: ", searchQuery)
//         // console.log(`${URL}/searchpage/searchquery/${searchQuery['searchquery']}`)
//         dispatch({ type: actionTypes.GET_MENTOR_DETIAL_BY_SEARCH_QUERY_REQUEST });

//         const { data } = await axios.get(`${URL}/profile/${id}`);
//         dispatch({
//             type: actionTypes.GET_MENTOR_DETIAL_BY_SEARCH_QUERY_REQUEST_SUCCESS,
//             payload: data
//         })

//     } catch (error) {
//         dispatch({
//             type: actionTypes.GET_MENTOR_DETIAL_BY_SEARCH_QUERY_REQUEST_FAIL,
//             payload: error.message
//         })
//         console.log("error while calling", error.message)
//     }
// }
import * as actionTypes from "../constants/mentorConstants"

export const getMentorsReducers = (state = { mentors: [] }, action) => {
    switch (action.type) {
        case actionTypes.GET_MENTOR_SUCCESS:
            // console.log("from reducers", action.payload)
            return { mentors: action.payload };
        // return [action.payload, ...payload];

        case actionTypes.GET_MENTOR_FAIL:
            return { error: action.payload };

        default:
            return state;
    }
}

export const getMentorDetailsReducers = (state = { mentor: {} }, action) => {
    switch (action.type) {
        case actionTypes.GET_MENTOR_DETIALS_REQUEST:
            // console.log("from reducers", action.payload)
            return { loading: true };
        // return [action.payload, ...payload];
        case actionTypes.GET_MENTOR_DETIALS_REQUEST_SUCCESS:
            // console.log("from reducers", action.payload)
            return { loading: false, mentor: action.payload };
        // return [action.payload, ...payload];

        case actionTypes.GET_MENTOR_DETIALS_REQUEST_FAIL:
            return { loading: false, error: action.payload };

        case actionTypes.GET_MENTOR_DETIALS_RESET:
            return { mentor: {} };

        default:
            return state;
    }
}
export const getMentorsDataBySearchQueryReducers = (state = { mentors: [] }, action) => {
    console.log("from reducer: ", action.payload)
    switch (action.type) {
        case actionTypes.GET_MENTOR_DETIAL_BY_SEARCH_QUERY_REQUEST:
            // console.log("from reducers", action.payload)
            return { loading: true };
        // return [action.payload, ...payload];
        case actionTypes.GET_MENTOR_DETIAL_BY_SEARCH_QUERY_REQUEST_SUCCESS:
            // console.log("from reducers", action.payload)
            return { loading: false, mentor: action.payload };
        // return [action.payload, ...payload];

        case actionTypes.GET_MENTOR_DETIAL_BY_SEARCH_QUERY_REQUEST_FAIL:
            return { loading: false, error: action.payload };

        case actionTypes.GET_MENTOR_DETIAL_BY_SEARCH_QUERY_RESET:
            return { mentors: [] };

        default:
            return state;
    }
}
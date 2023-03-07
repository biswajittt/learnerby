import * as actionTypes from "../constants/mentorConstants"
export const mentorInfo = (data = [], action) => {
    switch (action.type) {
        case actionTypes.Mentor_Info_After_Registration:
            // console.log("from reducer", action.data)
            return [action.data, ...data]

        default:
            return data;
    }
}
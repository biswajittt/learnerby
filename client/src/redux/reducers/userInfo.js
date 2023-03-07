import * as actionTypes from "../constants/mentorConstants"
export const userInfo = (data = [], action) => {
    switch (action.type) {
        case actionTypes.User_Info_After_Registration:
            return [action.data, ...data]
        case actionTypes.User_Info_After_Login:
            return [action.data, ...data]

        default:
            return data;
    }
}
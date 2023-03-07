import { combineReducers } from 'redux';
import { userInfo } from './reducers/userInfo'
import { mentorInfo } from './reducers/mentorInfo'
import { getMentorsReducers, getMentorDetailsReducers, getMentorsDataBySearchQueryReducers } from './reducers/mentorReducer'
import { bookClassReducer } from "./reducers/paymentReducer"

export default combineReducers({
    userInfo,
    mentorInfo,
    getMentorsReducers,
    getMentorDetailsReducers,
    getMentorsDataBySearchQueryReducers,
    bookClassReducer
})
export const ratingReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case 'RATING_REVIEW_REQUEST':
            return {
                ...state, loading: true
            }
        case 'RATING_REVIEW_SUCCESS':
            return {
                loading: false, ratingReviewData: action.payload
            }
        case 'RATING_REVIEW_FAIL':
            return {
                loading: false
            }

        default:
            return state;
    }
}
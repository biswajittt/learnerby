export const bookClassReducer = (state = {}, action) => {
    switch (action.type) {
        case 'BOOK_CLASS_REQUEST':
            return {
                ...state, loading: true
            }
        case 'BOOK_CLASS_SUCCESS':
            return {
                loading: false, isPaymentSuccessfull: true, dataAfterClassBooking: action.payload
            }
        case 'BOOK_CLASS_FAIL':
            return {
                loading: false, isPaymentSuccessfull: false
            }

        default:
            return state;
    }
}
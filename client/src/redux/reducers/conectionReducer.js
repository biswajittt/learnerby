export const connectionReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CONNECTION_REQUEST_SENT':
            return {
                ...state, loading: true
            }
        case 'CONNECTION_REQUEST_SENT_SUCCESS':
            return {
                loading: false, connectionData: action.payload
            }
        case 'CONNECTION_REQUEST_FAIL':
            return {
                loading: false
            }

        default:
            return state;
    }
}

// export const fetchConnectionStatusReducer = (state = {}, action) => {
//     switch (action.type) {
//         case 'CONNECTION_REQUEST_ACCEPTING':
//             return {
//                 ...state, loading: true
//             }
//         case 'CONNECTION_STATUS_SUCCESS':
//             return {
//                 loading: false, connectionStatus: action.payload
//             }
//         case 'CONNECTION_STATUS_FAIL':
//             return {
//                 loading: false
//             }

//         default:
//             return state;
//     }
// }
import axios from "axios";

const URL = "http://localhost:8000";

export const authenticateRegistration = async (data) => {
    try {
        return await axios.post(`${URL}/register`, data);
    } catch (error) {
        console.log(error);
    }
}

export const authenticateLogin = async (data) => {
    try {
        return await axios.post(`${URL}/login`, data, { withCredentials: true });

    } catch (error) {
        console.log(error);
        return error.response;
    }
}
export const updateUserProfile = async (data) => {
    try {
        return await axios.post(`${URL}/updateuserprofile`, data, { withCredentials: true });

    } catch (error) {
        console.log(error);
        return error.response;
    }
}

export const authenticateMentorRegistration = async (data) => {
    try {
        data.email = data.email.toLowerCase();
        data.interest = data.interest.map(data => { return data.toLowerCase() });
        console.log("from api", data)
        return await axios.post(`${URL}/registermentor`, data);

    } catch (error) {
        console.log("error", error)
    }
}

export const authenticateMentorLogin = async (data) => {
    try {
        data.email = data.email.toLowerCase();
        return await axios.post(`${URL}/loginmentor`, data);

    } catch (error) {
        console.log("error", error)
    }
}

export const sendRatingAndReview = async (data) => {
    try {
        return await axios.post(`${URL}/ratingandreview`, data);

    } catch (error) {
        console.log("error", error)
    }
}

// export const paymentToMentor = async (data) => {
//     try {
//         return await axios.post(`${URL}/secure/bookingclass/payment`, data);

//     } catch (error) {
//         console.log("error", error)
//     }
// }

// export const getUserPrifileData = async (data) => {
//     try {
//         return await axios.post(`${URL}/login`, data);
//     } catch (error) {
//         console.log(error);
//         return error.response;
//     }
// }
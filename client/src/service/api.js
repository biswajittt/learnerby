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
        // data.email = data.email.toLowerCase();
        return await axios.post(`${URL}/loginmentor`, data);

    } catch (error) {
        console.log("error", error)
    }
}

export const sendRatingAndReview = async (data) => {
    try {
        console.log("rating api", data);
        return await axios.post(`${URL}/ratingandreview`, data);

    } catch (error) {
        console.log("error", error)
    }
}

export const sendConnection = async (id, studentDetails, studentQuery) => {
    try {
        console.log("rating api", id, studentDetails, studentQuery);
        return await axios.post(`${URL}/mentordetials/sendconnection`, { id, studentDetails, studentQuery });

    } catch (error) {
        console.log("error", error)
    }
}

export const fetchConnectionStatus = async (studentId, studentObjectId, mentorId) => {
    try {
        console.log("connection status api", studentId, studentObjectId, mentorId);
        return await axios.post(`${URL}/mentor/dashboard/fetchconnectionstatus`, { studentId, studentObjectId, mentorId });

    } catch (error) {
        console.log("error", error)
    }
}

export const fetchClassesByMentorId = async (mentorId) => {
    try {
        return await axios.post(`${URL}/mentor/dashboard/fetchclassesbymentorid`, { mentorId });

    } catch (error) {
        console.log("error", error)
    }
}

export const changeClassStatus = async (studentObjectId, mentorId) => {
    try {
        console.log("api", studentObjectId, mentorId)
        return await axios.post(`${URL}/mentor/dashboard/classes/changeclassstatus`, { studentObjectId, mentorId });

    } catch (error) {
        console.log("error", error)
    }
}
// export const fetchMentorConnections = async (id) => {
//     try {
//         console.log(id)
//         return await axios.post(`${URL}/mentor/dashboard/fetchconnections`, { id });

//     } catch (error) {
//         console.log("error", error)
//     }
// }

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
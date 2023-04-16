const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema({
    mentorId: {
        type: String,
        require: true,
    },
    // mentorDetails: {
    //     type: Object,
    //     require: true,
    // },
    students: [{
        studentData: {
            type: Object,
            require: true,
        },
        studentQuery: {
            type: String,
            require: true,
        },
        status: {
            type: String,
            default: 'sent',
        },
        sended_on: {
            type: Number,
            // Changing Date.now() to Date.now did the trick this time around
            default: Date.now,
        },

    }],


})
const connection = mongoose.model("connection", connectionSchema);
module.exports = connection;
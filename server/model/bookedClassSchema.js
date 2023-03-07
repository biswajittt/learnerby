const mongoose = require("mongoose");

const bookedClassSchema = new mongoose.Schema({
    mentorId: {
        type: String,
        require: true,
    },
    mentorDetails: {
        type: Object,
        require: true,
    },
    bookedClasses: [{
        studentData: {
            type: Object,
            require: true,
        },
        bookedClassDetails: {
            classDetails: {
                type: Object,
                require: true,
            },
            classCompleted: {
                type: String,
                require: true,
                default: 'started',
            },
        },
        payment: {
            amount: {
                type: String,
                require: true,
            },
            transectionId: {
                type: String,
                require: true,
            },
            paymentStatus: {
                type: String,
                require: true,
                default: 'none'
            }
        },
    }],

    created_on: {
        type: Number,
        // Changing Date.now() to Date.now did the trick this time around
        default: Date.now,
    },
})
const bookedClass = mongoose.model("bookedClass", bookedClassSchema);
module.exports = bookedClass;
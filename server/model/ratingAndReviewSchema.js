const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({
    mentorId: {
        type: String,
        require: true,
    },
    ratingandreview: [{
        studentId: {
            type: String,
            required: true,
        },
        studentName: {
            type: String,
            required: true,
        },
        ratingValue: {
            type: Number,
            required: true,
        },
        reviewText: {
            type: String,
            required: true,
        },
        reviewed_on: {
            type: Number,
            // Changing Date.now() to Date.now did the trick this time around
            default: Date.now,
        },
    }],

})
const ratingAndReview = mongoose.model("ratingAndReview", ratingAndReviewSchema);
module.exports = ratingAndReview;
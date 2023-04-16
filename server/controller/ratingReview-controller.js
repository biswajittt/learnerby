const RatingAndReview = require("../model/ratingAndReviewSchema");


const getRatingReviewData = async (req, res) => {

    // const mentorId = req.params.id;
    const { mentorId } = req.query;
    // console.log("req:", req)
    try {
        const ratingReviewData = await RatingAndReview.find({ 'mentorId': mentorId })
        // console.log(ratingReviewData)
        res.status(200).json(ratingReviewData);
    } catch (error) {
        res.status(200).json({ message: error.message })
    }

}


const ratingAndReviewToMentor = async (req, res) => {

    const { mentorId, studentId, studentName, ratingValue, reviewText } = req.body;
    try {

        const exist = await RatingAndReview.findOne({ "mentorId": mentorId });

        if (exist) {
            const result = await RatingAndReview.findByIdAndUpdate(
                { '_id': exist._id },
                {
                    $push: {
                        ratingandreview: {
                            studentId: studentId,
                            studentName: studentName,
                            ratingValue: ratingValue,
                            reviewText: reviewText,
                        }
                    }
                },
                { new: true }
            )
            return res.status(200).json({ result });
        }
        else {
            // const RatingAndReview = req.body;
            // console.log("from mscheme: ", RatingAndReview)
            const newRatingAndReview = new RatingAndReview({
                mentorId: mentorId,
                ratingandreview: {
                    studentId: studentId,
                    studentName: studentName,
                    ratingValue: ratingValue,
                    reviewText: reviewText,
                },
            });
            const result = await newRatingAndReview.save()
            // console.log(result)
            res.status(200).json({ result });
        }

    } catch (error) {
        res.status(400).json({
            message: 'Something went worng',
            error: error.stack
        });
    }
}

module.exports = { getRatingReviewData, ratingAndReviewToMentor }
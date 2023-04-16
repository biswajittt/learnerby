const Connection = require("../model/connectionSchema");
const { default: mongoose } = require("mongoose");


const sendConnectionToMentor = async (req, res) => {

    const { id, studentDetails, studentQuery } = req.body;
    // console.log(req)
    try {
        // console.log(id, studentDetails, studentQuery)
        // console.log(studentDetails)
        const mentorExist = await Connection.findOne({ mentorId: req.body.id });
        // console.log("ccc", mentorExist)

        if (mentorExist) {
            const result = await Connection.findByIdAndUpdate(
                { '_id': mentorExist._id },
                {
                    $push: {
                        students: {
                            studentData: studentDetails,
                            studentQuery: studentQuery,
                        }
                    }
                },
                { new: true }
            )
            // console.log(result)
            return res.status(200).json({ result });
        }
        else {
            const newConnection = new Connection({
                mentorId: id,
                students: {
                    studentData: studentDetails,
                    studentQuery: studentQuery,
                }
            })

            const result = await newConnection.save();
            // console.log(result)
            res.status(200).json({ result });
        }
    } catch (error) {
        console.log(error)
    }
}

const fetchMentorConnections = async (req, res) => {

    const { id } = req.body
    try {
        // console.log(req.body)

        const mentorConnectionsDetails = await Connection.find({ 'mentorId': id });
        // console.log(mentorConnectionsDetails)
        //***** */
        // pipeline = [
        //     {
        //         $match: { 'mentorId': id }
        //     }
        // ];
        // // Define change stream
        // const changeStream = Connection.watch(pipeline);
        // // start listen to changes
        // changeStream.on("change", function (event) {
        //     console.log("chnage", JSON.stringify(event));
        // });
        //**** */
        return res.status(200).json({ mentorConnectionsDetails });

    } catch (error) {
        console.log(error)
    }
}

const fetchConnectionStatus = async (req, res) => {

    const { studentId, studentObjectId, mentorId } = req.body
    try {
        // console.log(studentId, mentorId)

        const isMentorExist = await Connection.findOne({ 'mentorId': mentorId });
        console.log(isMentorExist)

        if (isMentorExist) {

            let sObjectId = mongoose.Types.ObjectId(studentObjectId)
            console.log(sObjectId)
            const result = await Connection.findOneAndUpdate(
                { 'mentorId': mentorId, 'students._id': sObjectId },
                {
                    $set: {
                        'students.$.status': "accepted"
                    }
                },
                { new: true }
            )
            console.log("result", result)
            return res.status(200).json({ result });
        }



    } catch (error) {
        console.log(error)
    }
}

module.exports = { sendConnectionToMentor, fetchMentorConnections, fetchConnectionStatus }
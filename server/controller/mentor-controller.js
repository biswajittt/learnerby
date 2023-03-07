// const cloudinary = require("../utils/cloudinary");
// const uploader = require("../utils/multer");

const Mentor = require("../model/mentorSchema");
const bcrypt = require('bcryptjs');
const { default: mongoose } = require("mongoose");

const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


const mentorRegistration = async (req, res) => {
    // try {
    //     console.log(req.body.profileimage)
    //     const result = await cloudinary.uploader.upload(req.body.profileimage)
    //     // console.log("Result ",result)
    //     // console.log("",req.file)
    // } catch (error) {
    //     console.log("Error",error)
    // }

    try {
        const exist = await Mentor.findOne({ email: req.body.email });
        if (exist) {
            return res.status(401).json({ message: "User already exist" });
        }
        // req.body.interest = req.body.interest.map(data => { return data.toLowerCase() })
        const mentor = req.body;
        console.log("from mscheme: ", mentor)
        const newMentor = new Mentor(mentor);
        await newMentor.save()

        res.status(200).json({ data: mentor });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }
}

const mentorLogin = async (req, res) => {
    const mentorEmail = req.body.email;
    const password = req.body.password;
    if (!mentorEmail || !password) {
        return res.status(422).json({ error: "Please fill the required fields" });
    }
    try {
        let mentorLoginData = await Mentor.findOne({ email: mentorEmail });

        const isMatch = await bcrypt.compare(password, mentorLoginData.password);

        if (isMatch) {
            //generating token
            const token = await mentorLoginData.generateAuthToken();
            // setting cookie
            res.cookie("learnerbyauthtoken", token, {
                expires: new Date(Date.now(25892000000)),
                httpOnly: true
            });
            return res.status(200).json({ message: "Mentor login successful", data: mentorLoginData });
        } else {
            return res.status(401).json("Invalid login");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }
}

const getAllMentorsData = async (req, res) => {
    try {
        const mentors = await Mentor.find({});
        console.log("mentors")
        res.status(200).json(mentors)
    } catch (error) {
        res.status(200).json({ message: error.message })
    }
}

const getMentorDetailsById = async (req, res) => {
    try {
        const id = req.params.id;

        const mentorDetails = await Mentor.find({ '_id': id });
        // console.log("mentors")
        res.status(200).json(mentorDetails)
    } catch (error) {
        res.status(200).json({ message: error.message })
    }
}

const getMentorsDetaBySearchQuery = async (req, res) => {
    try {
        // const id = req.params.searchquery;
        const searchQuery = req.params.searchquery
        console.log("dsds", searchQuery)
        const mentorDetailsBySearchQuery = await Mentor.find(
            {
                interest: searchQuery
            }
        );
        // console.log(mentorDetailsBySearchQuery)
        res.status(200).json(mentorDetailsBySearchQuery)
    } catch (error) {
        // res.status(200).json({ message: error.message })
    }
}

// const updateMentorProfileData = async (req, res) => {
//     try {
//         // const localData = localStorage.getItem('accountHolderData');
//         const result = await User.findByIdAndUpdate({ _id: req.body.id }, {
//             $set: {
//                 name: req.body.name,
//                 email: req.body.email,
//                 phonenumber: req.body.phonenumber,
//                 address: req.body.address
//             }
//         },
//             {
//                 new: true,
//                 useFindAndModify: false
//             });
//         // console.log("after update", result)
//         return res.status(200).json({ data: result });
//     } catch (error) {
//         console.log(error)
//     }
// }

const saveRatingReviewData = async (req, res) => {
    try {



        // const localData = localStorage.getItem('accountHolderData');
        console.log("from contro", req.body)
        const result = await Mentor.findByIdAndUpdate({ '_id': req.body.mentorId }, {
            $set: {
                ratingandreview: {
                    userid: req.body.userId,
                    ratingvalue: req.body.ratingValue,
                    reviewtext: req.body.reviewText,
                }
            }
        },
            {
                new: true,
                useFindAndModify: false
            });
        // console.log("after update", result)
        return res.status(200).json({ result });
    } catch (error) {
        console.log(error)
    }
}

// const getRatingReviewData = async (req, res) => {
//     try {
//         // const id = req.params.searchquery;
//         const searchQuery = req.params.searchquery
//         console.log("dsds", searchQuery)
//         const mentorDetailsBySearchQuery = await Mentor.find(
//             {
//                 interest: searchQuery
//             }
//         );
//         // console.log(mentorDetailsBySearchQuery)
//         res.status(200).json(mentorDetailsBySearchQuery)
//     } catch (error) {
//         // res.status(200).json({ message: error.message })
//     }
// }

// const paymentToMentor = async (req, res) => {
//     // console.log(req.body)


//     const { mentorId, token, amount, currentUser, classDetails } = req.body;
//     try {
//         const student = await stripe.customers.create({
//             email: token.email,
//             source: token.id
//         })

//         const payment = await stripe.paymentIntents.create({
//             amount: amount,
//             currency: 'inr',
//             customer: student.id,
//             receipt_email: token.email,
//         }, {
//             idempotencyKey: uuidv4()
//         })
//         // console.log(payment)
//         if (payment) {
//             const result = await Mentor.findByIdAndUpdate({ '_id': req.body.mentorId }, {
//                 $set: {
//                     bookedClass: {
//                         studentData: currentUser,
//                         classDetails: classDetails,
//                         amount: amount,
//                         transectionId: payment.id,
//                         paymentStatus: 'paid'
//                     }
//                 }
//             },
//                 {
//                     new: true,
//                     useFindAndModify: false
//                 });
//             // const newBooking = new Mentor({
//             //     studentData: currentUser,
//             //     classDetails: '',
//             //     amount: 100,
//             //     transectionId: payment.id
//             // });
//             // newBooking.save();
//             console.log(result)
//             // res.send("Payment Success", result);
//             return res.status(200).json({ result });
//         } else {
//             res.send("Payment Failed");
//         }
//     } catch (error) {
//         res.status(400).json({
//             message: 'Something went worng',
//             error: error.stack
//         });
//     }
// }

module.exports = { mentorRegistration, mentorLogin, getAllMentorsData, getMentorDetailsById, getMentorsDetaBySearchQuery, saveRatingReviewData }
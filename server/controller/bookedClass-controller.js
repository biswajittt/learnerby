const BookedClass = require("../model/bookedClassSchema");
const { default: mongoose } = require("mongoose");

const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)



const paymentToMentor = async (req, res) => {
    // console.log(req.body)


    const { mentorId, token, amount, currentUser, mentorData, classDetails } = req.body;
    try {
        const student = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'inr',
            customer: student.id,
            receipt_email: token.email,
        }, {
            idempotencyKey: uuidv4()
        })
        // console.log(payment)
        if (payment) {
            const exist = await BookedClass.findOne({ mentorId: req.body.mentorId });
            // console.log(exist)
            // console.log(exist.mentorId)
            // console.log(req.body.mentorId)
            // console.log(typeof req.body.mentorId)
            if (exist) {
                console.log("inside exist", exist._id)

                const result = await BookedClass.findByIdAndUpdate(
                    { '_id': exist._id },
                    {
                        $push: {
                            bookedClasses: {
                                studentData: currentUser,
                                bookedClassDetails: {
                                    classDetails: classDetails,
                                },
                                payment: {
                                    amount: amount,
                                    transectionId: payment.id,
                                    paymentStatus: 'paid'
                                }
                            }
                        }
                    },
                    { new: true }
                )

                // const result = await BookedClass.findByIdAndUpdate({ '_id': exist._id }, {
                //     $set: {
                //         bookedClasses: {
                //             bookedClassDetails: {
                //                 studentData: currentUser,
                //                 classDetails: classDetails,
                //             },
                //             payment: {
                //                 amount: amount,
                //                 transectionId: payment.id,
                //                 paymentStatus: 'paid'
                //             }
                //         }
                //     }
                // },
                //     {
                //         new: true,
                //         useFindAndModify: false
                //     });
                // console.log(result)
                return res.status(200).json({ dataAfterBookingClass: result });
            }
            else {
                const bookedClassData = req.body;
                console.log("from mscheme: ", bookedClassData)
                const newBookedClassData = new BookedClass({
                    mentorId: mentorId,
                    mentorDetails: mentorData,
                    bookedClasses: {
                        studentData: currentUser,
                        bookedClassDetails: {
                            classDetails: classDetails,
                        },
                        payment: {
                            amount: amount,
                            transectionId: payment.id,
                            paymentStatus: 'paid'
                        }
                    }
                });
                const result = await newBookedClassData.save()
                console.log(result)
                res.status(200).json({ dataAfterBookingClass: result });
            }




            // const result = await Mentor.findByIdAndUpdate({ '_id': req.body.mentorId }, {
            //     $set: {
            //         bookedClass: {
            //             studentData: currentUser,
            //             classDetails: classDetails,
            //             amount: amount,
            //             transectionId: payment.id,
            //             paymentStatus: 'paid'
            //         }
            //     }
            // },
            //     {
            //         new: true,
            //         useFindAndModify: false
            //     });
            // // const newBooking = new Mentor({
            // //     studentData: currentUser,
            // //     classDetails: '',
            // //     amount: 100,
            // //     transectionId: payment.id
            // // });
            // // newBooking.save();
            // console.log(result)
            // // res.send("Payment Success", result);
            // return res.status(200).json({ result });
        } else {
            res.send("Payment Failed");
        }
    } catch (error) {
        res.status(400).json({
            message: 'Something went worng',
            error: error.stack
        });
    }
}
module.exports = { paymentToMentor }
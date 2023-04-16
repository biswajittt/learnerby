const { userRegistration, userLogin, updateUserProfileData } = require("../controller/user-controller");
const { mentorLogin, mentorRegistration, getAllMentorsData, getMentorDetailsById, getMentorsDetaBySearchQuery, saveRatingReviewData } = require("../controller/mentor-controller");
// const { getTeachers } = require("../controller/teacher-controller");
const { paymentToMentor, getClassesByMentorId, changeClassStatus } = require("../controller/bookedClass-controller");

const { ratingAndReviewToMentor, getRatingReviewData } = require("../controller/ratingReview-controller");

const express = require("express");

const { sendConnectionToMentor, fetchMentorConnections, fetchConnectionStatus } = require("../controller/connection-controller");


const router = express.Router();

router.post('/register', userRegistration);
router.post('/login', userLogin);

router.post('/updateuserprofile', updateUserProfileData);

router.post('/registermentor', mentorRegistration);
router.post('/loginmentor', mentorLogin);

router.get('/allMentorsdata', getAllMentorsData);
router.get('/mentordetails/:id', getMentorDetailsById);

router.get('/searchpage/searchquery/:searchquery', getMentorsDetaBySearchQuery);


router.post('/ratingandreview', ratingAndReviewToMentor);
router.get('/reviewandratingdata', getRatingReviewData);



//stripe payment
router.post('/api/payment/bookclass', paymentToMentor);

//conectiom
router.post('/mentordetials/sendconnection', sendConnectionToMentor);
router.post('/mentor/dashboard/fetchconnections', fetchMentorConnections);
router.post('/mentor/dashboard/fetchconnectionstatus', fetchConnectionStatus);


router.post('/mentor/dashboard/fetchclassesbymentorid', getClassesByMentorId);
router.post('/mentor/dashboard/classes/changeclassstatus', changeClassStatus);

module.exports = router
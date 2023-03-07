const { userRegistration, userLogin, updateUserProfileData } = require("../controller/user-controller");
const { mentorLogin, mentorRegistration, getAllMentorsData, getMentorDetailsById, getMentorsDetaBySearchQuery, saveRatingReviewData } = require("../controller/mentor-controller");
// const { getTeachers } = require("../controller/teacher-controller");
const { paymentToMentor } = require("../controller/bookedClass-controller");

const express = require("express");

const router = express.Router();

router.post('/register', userRegistration);
router.post('/login', userLogin);

router.post('/updateuserprofile', updateUserProfileData);

router.post('/registermentor', mentorRegistration);
router.post('/loginmentor', mentorLogin);

router.get('/allMentorsdata', getAllMentorsData);
router.get('/mentordetails/:id', getMentorDetailsById);

router.get('/searchpage/searchquery/:searchquery', getMentorsDetaBySearchQuery);


router.post('/ratingandreview', saveRatingReviewData);


//stripe payment
router.post('/api/payment/bookclass', paymentToMentor);

module.exports = router
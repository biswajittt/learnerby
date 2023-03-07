const User = require("../model/userSchema");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userRegistration = async (req, res) => {

    const { name, email, phonenumber, password } = req.body;
    if (!name || !email || !phonenumber || !password) {
        return res.status(422).json({ error: "Please fill the required fields" });
    }

    try {
        const exist = await User.findOne({ email: req.body.email });
        if (exist) {
            return res.status(401).json({ message: "User already exist" });
        }

        const user = req.body;
        const newUser = new User(user);
        await newUser.save()
        // console.log(newUser)

        // const token = await newUser.generateAuthToken();
        // console.log(token);

        // res.cookie("learnerbyauthtoken", token, {
        //     expires: new Date(Date.now(25892000000)),
        //     httpOnly: true
        // });
        // console.log(req.cookies)

        res.status(200).json({ studentData: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }
}

const userLogin = async (req, res) => {
    const userEmail = req.body.email;
    const password = req.body.password;
    if (!userEmail || !password) {
        return res.status(422).json({ error: "Please fill the required fields" });
    }
    try {
        let userLogin = await User.findOne({ email: userEmail });

        const isMatch = await bcrypt.compare(password, userLogin.password);

        if (isMatch) {
            //generating token
            const token = await userLogin.generateAuthToken();
            // setting cookie
            res.cookie("learnerbyauthtoken", token, {
                expires: new Date(Date.now(25892000000)),
                httpOnly: true
            });
            return res.status(200).json({ message: "User login successful", data: { userLogin, token } });
        } else {
            return res.status(401).json("Invalid login");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }
}

const updateUserProfileData = async (req, res) => {
    try {
        // const localData = localStorage.getItem('accountHolderData');
        const result = await User.findByIdAndUpdate({ _id: req.body.id }, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                phonenumber: req.body.phonenumber,
                address: req.body.address
            }
        },
            {
                new: true,
                useFindAndModify: false
            });
        // console.log("after update", result)
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log(error)
    }
}

module.exports = { userRegistration, userLogin, updateUserProfileData }
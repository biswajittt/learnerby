const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        min: 3,
        max: 20
    },
    category: {
        type: String,
        default: 'student'
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    phonenumber: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        min: 6,
        max: 20
    },
    created_on: {
        type: Number,
        // Changing Date.now() to Date.now did the trick this time around
        default: Date.now,
    },
});

//hasing the password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

//generating token
userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        // this.token = this.token.concat({ token: token });
        // this.token = token;
        // await this.save();
        return token;
    } catch (error) {
        console.log(error)
    }
}

const user = mongoose.model("user", userSchema);
module.exports = user;
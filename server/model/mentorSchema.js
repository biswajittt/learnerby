const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');

const mentorSchema = new mongoose.Schema({
    profileimage: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    category: {
        type: String,
        default: 'mentor'
    },
    name: {
        type: String,
        require: true,
        trim: true,
        min: 3,
        max: 20
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
    address: {
        type: String,
        require: true,
        trim: true,
        min: 5,
        max: 50
    },
    title: {
        type: String,
        require: true,
        trim: true,
        min: 5,
        max: 50
    },
    aboutme: {
        type: String,
        require: true,
        trim: true,
        min: 10,
        max: 500
    },
    interest: {
        type: Array,
        require: true,
        min: 3,
        max: 50
    },
    mode: {
        type: String,
        require: true,
        trim: true,
        min: 3,
        max: 50
    },
    priceperhour: {
        type: String,
        require: true,
        trim: true,
        min: 1,
        max: 5
    },
    priceperday: {
        type: String,
        require: true,
        trim: true,
        min: 1,
        max: 5
    },

    password: {
        type: String,
        require: true,
        min: 6,
        max: 20
    },
    bookedClass: {
        studentData: {
            type: Object,
            require: true,
        },
        classDetails: [],
        amount: {
            type: String,
            require: true,
        },
        classCompleted: {
            type: String,
            require: true,
            default: 'started',
        },
        transectionId: {
            type: String,
            require: true,
        },
        paymentStatus: {
            type: String,
            require: true,
            default: 'none'
        },
    },
    created_on: {
        type: Number,
        // Changing Date.now() to Date.now did the trick this time around
        default: Date.now,
    },
});

//hasing the password
mentorSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

//generating token
mentorSchema.methods.generateAuthToken = async function () {
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

const mentor = mongoose.model("mentor", mentorSchema);
module.exports = mentor;
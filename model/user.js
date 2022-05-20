const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    firstName: {
        type: String,
        default: 'Chưa đặt'
    },
    surName: {
        type: String,
        default: 'Chưa đặt'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
       required: true
    },
    gender: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'user.png'
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("user", userschema);
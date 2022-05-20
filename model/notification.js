const mongoose = require('mongoose');

const notification = new mongoose.Schema({
    postId: {
        type: String
    },
    content: {
        type: String
    },
    fromUser:{
        type: String
    },
    notiType: {
        type: String
    },
    userId: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('notification', notification);
const mongoose = require('mongoose');

const Post = new mongoose.Schema({
    content: {
        type: String,
        default: "Post's title"
    },
    image: {
        type: String,
        default: ''
    },
    userId: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model("Post", Post)
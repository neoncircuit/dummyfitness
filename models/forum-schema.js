const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const PostSchema = new Schema({
    topic: { type: String, required: true }, // New field for the topic
    content: { type: String, required: true, maxlength: 2000 }, // Character limit for the content
    author: { 
        id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        username: String,
        country: String
    },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 }, // New field for dislikes
    comments: [CommentSchema], // Use CommentSchema for comments
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
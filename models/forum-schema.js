const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        username: String,
        country: String
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
    topic: { type: String, required: true },
    content: { type: String, required: true, maxlength: 2000 },
    author: { 
        id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        username: String,
        country: String
    },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    likedBy: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
    dislikedBy: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
    comments: [CommentSchema],
    date: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', CommentSchema);
const Post = mongoose.model('Post', PostSchema);

module.exports = {
    Comment,
    Post
};
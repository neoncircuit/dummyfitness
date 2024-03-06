const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userFirstName: { type: String, required: true },
    username: { type: String, required: true },
    userEmail: { type: String, required: true },
    message: { type: String, required: true },
    feedbackType: { type: String, required: true },
    rating: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
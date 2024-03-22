const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true }, 
    lastName: { type: String, required: true },
    country: { type: String },
    age: { type: Number, required: true },
    exerciseFrequency: { type: String },
    fitnessGoals: { type: String },
    points: { type: Number, default: 0 },
    totalPointsEarned: { type: Number, default: 0 },
    claimedRewards: [{
        name: String,
    }],
});

module.exports = mongoose.model('User', UserSchema);
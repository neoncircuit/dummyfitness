const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    steps: [
        {
        description: { type: String, required: true },
        image: { type: String, required: true },
        },
    ],
    correct: [
        {
        description: { type: String, required: true },
        image: { type: String, required: true },
        },
    ],
    wrong: [
        {
        description: { type: String, required: true },
        image: { type: String, required: true },
        },
    ],
    videos: {
        front: { type: String, required: true },
        side: { type: String, required: true },
    },
});

module.exports = mongoose.model('Workout', WorkoutSchema);
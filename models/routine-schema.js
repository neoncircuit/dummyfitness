const mongoose = require('mongoose');

const RoutineSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    workouts: [
        {
        workout: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', required: true },
        repetitions: { type: Number },
        duration: { type: Number },
        },
    ],
});

module.exports = mongoose.model('Routine', RoutineSchema);
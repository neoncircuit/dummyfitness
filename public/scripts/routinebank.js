// routine-details.js
import { workouts } from './workoutbank2.js';

// Create a map for easy lookup of workouts by name
const workoutMap = workouts.reduce((map, workout) => {
  // Clone the workout to avoid modifying the original
  const workoutCopy = { ...workout };

  // Set default values based on the workout type
  if (workout.type === 'incremental') {
    workoutCopy.repetitions = 10;
  } else if (workout.type === 'timed') {
    workoutCopy.duration = 30;
  }

  map[workout.name] = workoutCopy;
  return map;
}, {});


const routines = [
  {
    name: 'Routine 1',
    workouts: [
      workoutMap['Burpees'], 
      workoutMap['Planks'], 
      workoutMap['Squats'],
      workoutMap['Planks']
    ], // select workouts for this routine
  },

  {
    name: 'My Routine',
    workouts: [
      workoutMap['Planks (Straight-Arm)'], 
      workoutMap['Push Ups'], 
      workoutMap['Squats'],
      workoutMap['Side Planks (Straight-Arm)']
    ], // select workouts for this routine
  },
  // more routines...
];

export default routines;
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
    name: 'Full Body Burner',
    workouts: [
      workoutMap['Burpees'], 
      workoutMap['Mountain Climbers'], 
      workoutMap['Jumping Jacks'],
    ], // select workouts for this routine
  },

  {
    name: 'Upper Body Blast',
    workouts: [
      workoutMap['Chin Ups'], 
      workoutMap['Pull Ups'], 
      workoutMap['Push Ups'],
    ], // select workouts for this routine
  },

  {
    name: 'Leg Day Blast',
    workouts: [
      workoutMap['Squats (Barbell)'], 
      workoutMap['Deadlifts (Barbell)'], 
      workoutMap['Hip Thrusts (Barbell)'],
    ], // select workouts for this routine
  },

  {
    name: 'Core Stability',
    workouts: [
      workoutMap['Planks'], 
      workoutMap['Side Planks'], 
      workoutMap['Planks (Straight-Arm)'],
      workoutMap['Side Planks (Straight-Arm)'],
    ], // select workouts for this routine
  },

  {
    name: 'Leg Day Blast',
    workouts: [
      workoutMap['Squats (Barbell)'], 
      workoutMap['Deadlifts (Barbell)'], 
      workoutMap['Hip Thrusts (Barbell)'],
    ], // select workouts for this routine
  },
].map(routine => {
  console.log(routine.workouts); // Log the workouts array
  const totalPoints = routine.workouts.reduce((total, workout) => total + workout.points, 0);
  console.log(totalPoints); // Log the totalPoints calculation
  return {
    ...routine,
    totalPoints,
  };
});

  //];

// // Calculate total points for each routine
// routines.forEach(routine => {
//   routine.totalPoints = routine.workouts.reduce((total, workout) => total + workout.points, 0);
// });

export default routines;
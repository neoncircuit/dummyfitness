import { workouts } from './workoutbank2.js';

console.log('Workouts in workout-details.js:', workouts);

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded event fired.');
  const params = new URLSearchParams(window.location.search);
  const workoutName = params.get('name');

  console.log('Workout Name:', workoutName);
  
  const workout = workouts.find(w => w.name === workoutName);
  console.log('Workout:', workout);

  if (workout) {
    console.log('Workout found:', workout);
    displayWorkoutDetails(workout);
    displayWorkoutVideos(workout);
  } else {
    // Handle workout not found
    console.error('Workout not found!');
    alert('Workout not found!');
  }
});

function displayWorkoutDetails(workout) {
  document.getElementById('workout-name').textContent = workout.name;
  document.getElementById('workout-description').textContent = workout.description;
  document.getElementById('workout-difficulty').textContent = workout.difficulty;
  document.getElementById('workout-category').textContent = workout.category;

  const workoutStepsElement = document.getElementById('workout-steps');
  workoutStepsElement.innerHTML = workout.steps.map(step => `<img src="${step.image}" alt="Step Image" class="step-icon"><p>${step.description}</p><br>`).join('');

  const correctFormsElement = document.getElementById('correct-forms');
  correctFormsElement.innerHTML = workout.correct.map(form => `<img src="${form.image}" alt="Correct Form Image" class="form-icon"><p>${form.description}</p><br>`).join('');

  const wrongFormsElement = document.getElementById('wrong-forms');
  wrongFormsElement.innerHTML = workout.wrong.map(form => `<img src="${form.image}" alt="Wrong Form Image" class="form-icon"><p>${form.description}</p><br>`).join('');
}

function displayWorkoutVideos(workout) {
  console.log('Workout Videos:', workout.videos);
  const frontalVideo = document.getElementById('frontal-video');
  const sideVideo = document.getElementById('side-video');

  // Check if the videos are defined before setting the source
  if (workout.videos && workout.videos.front && workout.videos.side) {
    console.log('Setting video sources:', workout.videos.front, workout.videos.side);
    frontalVideo.src = workout.videos.front;
    sideVideo.src = workout.videos.side;
    // Set the loop attribute to true
    frontalVideo.loop = true;
    sideVideo.loop = true;
    frontalVideo.autoplay = true;
    sideVideo.autoplay = true;
  } else {
    console.error('Videos are not defined for this workout.');
  }
}


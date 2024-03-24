import routines from './routinebank.js';

let restTimerId; // Variable to store the interval ID for the countdown
let increaseRepetitionsCount = 0; // Variable to track the number of times increase repetitions button is clicked
let increaseDurationCount = 0; // Variable to track the number of times increase duration button is clicked
let increaseRestTimeCount = 0; // Variable to track the number of times increase rest time button is clicked
let additionalRepetitions = 0; // Additional repetitions added by the "Increase Repetitions" button
let additionalRestTime = 0; // Additional rest time added by the "Increase Rest Time" button
let additionalDuration = 0; // Additional duration added by the "Increase Duration" button
let pointsEarned = 0;

// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Get the routine name from the URL parameters
const routineName = decodeURIComponent(urlParams.get('name'));

// Find the selected routine in the routines array
const selectedRoutine = routines.find(routine => routine.name === routineName);

async function startRoutine(routine) {

    console.log('Initial pointsEarned:', pointsEarned);

    // Check if routine is undefined
    if (!routine) {
        console.error('Error: routine is undefined');
        return;
    }

    console.log(`Starting selected routine... ${routine.name} `);

    const routineNameElement = document.getElementById('routineName');
    routineNameElement.textContent = routine.name;

    const routineWorkoutsElement = document.getElementById('routineWorkouts');

    // Check if routine.workouts is undefined
    if (!routine.workouts) {
        console.error('Error: routine.workouts is undefined');
        routineWorkoutsElement.innerHTML = '<p>No workouts in this routine.</p>';
    } else {
        routineWorkoutsElement.innerHTML = `
        <h3>Workouts in this routine:</h3>
        <div class="timeline">
            ${routine.workouts.map((workout, index) => {
                // Check if workout is undefined
                if (!workout) {
                    console.error(`Error: workout at index ${index} is undefined`);
                    return '';
                }

                return `
                    <div class="timeline-step" id="timeline-step-${index}">
                        <span class="timeline-step-number">${index + 1}</span>
                        <span class="timeline-step-name">${workout.name}</span>
                    </div>
                `;
            }).join('')}
        </div>
    `;
    }

    additionalRepetitions = 0;
    additionalDuration = 0;  

    const totalRoutinePoints = selectedRoutine.workouts.reduce((total, workout) => total + workout.points, 0);
    console.log('totalRoutinePoints:', totalRoutinePoints);

    // Iterate over each workout in the routine
    for (let i = 0; i < routine.workouts.length; i++) {
        const workout = routine.workouts[i];
        
        console.log('pointsEarned before performWorkout:', pointsEarned);
        // Scenario 2: Perform the workout
        pointsEarned = await performWorkout(workout, i);
  
        console.log('pointsEarned after performWorkout:', pointsEarned);
        // Scenario 3: Rest period (if not the last workout)
        if (i < routine.workouts.length - 1) {
            await startRestTimer(30);
        }
    }

    //pointsEarned += totalRoutinePoints;
    console.log('pointsEarned after all workouts:', pointsEarned);

    // Scenario 4: Routine completed
    alert(`Congratulations! You have completed your routine: ${routine.name}.`);

    // Update the user's points in the database
    getUser().then(user => {
        if (!user) {
            console.error('Error: User not found');
            return;
        }
    
        console.log('user.points:', user.points);
        let userPoints = Number(user.points);
        if (isNaN(userPoints)) {
            console.error('Error: user.points is not a number:', user.points);
            userPoints = 0;
        }
        console.log('pointsEarned:', pointsEarned);
        user.points = userPoints + pointsEarned;

        console.log('User after updating points:', user);

        console.log('User before saving:', user);
        saveUser(user).then(() => {
            console.log('User saved successfully');
            window.location.href = '/routines';
        });
    }).catch(error => {
        console.error('Error fetching user:', error);
    });
}

async function performWorkout(workout, index) {
    console.log(`Starting ${workout.name}...`);
    
    // Reset the increaseRepetitionsCount and increaseDurationCount at the start of each workout
    increaseRepetitionsCount = 0;
    increaseDurationCount = 0; // Reset increaseDurationCount
    

    // Display workout name, targeted muscle group, and type
    const workoutDetailsElement = document.getElementById('workoutDetails');
    workoutDetailsElement.innerHTML = `
    <h2>${workout.name}</h2>
    <p>Targeted Muscle Group: ${workout.category}</p>
    <p>Type: ${workout.type}</p>
    <div style="display: flex; justify-content: space-between;">
        <video width="400" height="400" controls loop autoplay>
            <source src="${workout.videos.front}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <video width="400" height="400" controls loop autoplay>
            <source src="${workout.videos.side}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>
    <p id="workoutTimer"></p>
    <p id="workoutCounter"></p>
`;
    workoutDetailsElement.className = 'workout-details';

    // Get the workout timer element
    const workoutTimerElement = document.getElementById('workoutTimer');

    // Get the workout counter element
    const workoutCounterElement = document.getElementById('workoutCounter');

    // Display workout name and type
    console.log(`Workout Type: ${workout.type}`);
    
    // Display increase buttons based on workout type
    if (workout.type === 'incremental') {
        hideButton('increaseDurationButton');
        hideButton('increaseRestTimeButton');
        if (increaseRepetitionsCount < 2) {
            console.log('Display Increase Repetitions Button');
            showButton('increaseRepetitionsButton');
        }
    } else if (workout.type === 'timed') {
        hideButton('increaseRepetitionsButton');
        hideButton('increaseRestTimeButton');
        if (increaseDurationCount < 2) {
            console.log('Display Increase Duration Button');
            showButton('increaseDurationButton');
        }
    }

    // Create a countdown for the workout
    let count = workout.type === 'incremental' ? workout.repetitions : workout.duration;
    let durationCount = workout.duration; // Initialize durationCount with workout.duration
    let isStartPosition = true; // Flag to indicate the position
    return new Promise(resolve => {
        if (workout.type === 'timed') {
            // Create a separate interval for the duration countdown in timed workouts
            const durationIntervalId = setInterval(() => {
                durationCount += additionalDuration; // Add additional duration to duration count
                additionalDuration = 0; // Reset additional duration after it's added to the timer
                console.log(`${workout.name} Time Left: ${durationCount}s`);
                workoutTimerElement.textContent = `Time Left: ${durationCount}s`;
                durationCount--;
                if (durationCount === 0) {
                    clearInterval(durationIntervalId);
                    document.getElementById(`timeline-step-${index}`).classList.add('timeline-step-completed');
                    //resolve(); // Resolve the promise when durationCount reaches 0
                    resolve(pointsEarned);
                }
            }, 1000); // Run every second
        }

        if (workout.type === 'incremental') {
            const intervalId = setInterval(() => {
                count += additionalRepetitions;
                additionalRepetitions = 0;
                if (isStartPosition) {
                    console.log(`${workout.name} - Start Position: ${count}`);
                    workoutCounterElement.textContent = `Repetitions: ${count} (Start Position)`;
                } else {
                    console.log(`${workout.name} - End Position: ${count}`);
                    workoutCounterElement.textContent = `Repetitions: ${count} (End Position)`;
                    count--;
                }
                isStartPosition = !isStartPosition; // Toggle the position
                if (count === 0) {
                    clearInterval(intervalId);
                    document.getElementById(`timeline-step-${index}`).classList.add('timeline-step-completed');
                    //resolve(); // Resolve the promise when count reaches 0
                    resolve(pointsEarned);
                }
            }, 4000); // Run every 4 seconds
        }

        

        // Add additional points for increasing repetitions/duration
        let additionalPoints;
        switch (workout.difficulty) {
            case 'Beginner':
            additionalPoints = 2;
            break;
            case 'Intermediate':
            additionalPoints = 3;
            break;
            case 'Advanced':
            additionalPoints = 4;
            break;
            default:
            additionalPoints = 0;
        }

        // Hide the workout counter for timed workouts and the workout timer for incremental workouts
        if (workout.type === 'timed') {
            workoutCounterElement.style.display = 'none';
            console.log('increaseDurationCount * additionalPoints:', increaseDurationCount * additionalPoints);
            pointsEarned += increaseDurationCount * additionalPoints;
        } else if (workout.type === 'incremental') {
            workoutTimerElement.style.display = 'none';
            console.log('increaseRepetitionsCount * additionalPoints:', increaseRepetitionsCount * additionalPoints);
            pointsEarned += increaseRepetitionsCount * additionalPoints;
        }

        console.log('workout.points:', workout.points);
        pointsEarned += workout.points;
        return pointsEarned;
    });
}


function startRestTimer(duration) {
    return new Promise(resolve => {
        console.log('Starting Rest Timer...');
        
        // Reset the increaseRestTimeCount at the start of each rest period
        increaseRestTimeCount = 0;
        
        // Hide the "Increase Repetitions" button at the start of each rest period
        hideButton('increaseRepetitionsButton');

        // Hide the "Increase Duration" button at the start of each rest period
        hideButton('increaseDurationButton');

        // Show the "Increase Rest Time" button at the start of each rest period
        if (increaseRestTimeCount < 2) {
            console.log('Display Increase Rest Time Button');
            showButton('increaseRestTimeButton');
        }

        // Update the workout details element to indicate an active rest period
        const workoutDetailsElement = document.getElementById('workoutDetails');
        workoutDetailsElement.innerHTML = `
            <h2>Rest Period</h2>
            <p id="restTimer"></p>
        `;

        // Get the rest timer element
        const restTimerElement = document.getElementById('restTimer');

        // Start countdown for rest period
        let timeLeft = duration;
        restTimerId = setInterval(() => {
            // Add additional rest time to the time left
            timeLeft += additionalRestTime;
            additionalRestTime = 0; // Reset additional rest time after it's added to the timer
            
            console.log(`Rest Time Left: ${timeLeft}s`);
            restTimerElement.textContent = `Time Left: ${timeLeft}s`; // Update the rest timer element
            timeLeft--;
            
            // Stop timer when timeLeft is 0
            if (timeLeft === 0) {
                clearInterval(restTimerId);
                hideButton('increaseRestTimeButton'); // Hide increase rest time button after rest period
                resolve();
            }
        }, 1000);
    });
}

function showButton(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.style.display = 'block';
    }
}

function hideButton(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.style.display = 'none';
    }
}

export function handleIncreaseRepetitionsClick() {
    if (increaseRepetitionsCount < 2) {
        increaseRepetitionsCount++;
        additionalRepetitions += 5;
        console.log('Increase Repetitions Clicked, increaseRepetitionsCount:', increaseRepetitionsCount);

        // Add additional points for increasing repetitions
        let additionalPoints;
        switch (selectedRoutine.difficulty) {
            case 'Beginner':
            additionalPoints = 2;
            break;
            case 'Intermediate':
            additionalPoints = 3;
            break;
            case 'Advanced':
            additionalPoints = 4;
            break;
            default:
            additionalPoints = 0;
        }
        console.log('increaseRepetitionsCount * additionalPoints:', increaseRepetitionsCount * additionalPoints);
        pointsEarned += increaseRepetitionsCount * additionalPoints;
        console.log('pointsEarned after increasing repetitions:', pointsEarned);

        // Hide the Repetition button after it's clicked twice
        if (increaseRepetitionsCount >= 2) {
            hideButton('increaseRepetitionsButton');
        }
    } else {
        console.log('Maximum repetitions increase reached');
    }
}

export function handleIncreaseDurationClick() {
    if (increaseDurationCount < 2) {
        increaseDurationCount++;
        additionalDuration += 15; // Add 15 seconds to the duration
        console.log('Increase Duration Clicked, increaseDurationCount:', increaseDurationCount);
        
        // Add additional points for increasing duration
        let additionalPoints;
        switch (selectedRoutine.difficulty) {
            case 'Beginner':
            additionalPoints = 2;
            break;
            case 'Intermediate':
            additionalPoints = 3;
            break;
            case 'Advanced':
            additionalPoints = 4;
            break;
            default:
            additionalPoints = 0;
        }
        console.log('increaseDurationCount * additionalPoints:', increaseDurationCount * additionalPoints);
        pointsEarned += increaseDurationCount * additionalPoints;
        console.log('pointsEarned after increasing duration:', pointsEarned);

        // Hide the Duration button after it's clicked twice
        if (increaseDurationCount >= 2) {
            hideButton('increaseDurationButton');
        }
    } else {
        console.log('Maximum duration increase reached');
    }
}

export function handleIncreaseRestTimeClick() {
    if (increaseRestTimeCount < 2) {
        increaseRestTimeCount++;
        additionalRestTime += 15; // Add 15 seconds to the rest time
        console.log('Increase Rest Time Clicked, increaseRestTimeCount:', increaseRestTimeCount);
        
        // Hide the Rest Button after it's clicked twice
        if (increaseRestTimeCount >= 2) {
            hideButton('increaseRestTimeButton');
        }
    } else {
        console.log('Maximum rest time increase reached');
    }
}

function handleExitButtonClick() {
    const confirmExit = confirm("Are you sure you want to exit the routine? Your progress will be reset.");
    
    if (confirmExit) {
        console.log('Routine progress reset. Redirecting to routines page...');
        window.location.href = '/routines';
    }
}

function getUser() {
    return fetch(`/api/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include any other headers your server requires for authentication
      },
    })
    .then(response => response.json())
    .then(data => data.user)
    .catch((error) => {
      console.error('Error:', error);
    });
}
  
function saveUser(user) {
    return fetch(`/api/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Include any other headers your server requires for authentication
      },
      body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data => console.log('User saved successfully:', data))
    .catch((error) => {
      console.error('Error:', error);
    });
}


window.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton'); 
    const exitButton = document.getElementById('exitButton'); 
    const increaseRepetitionsButton = document.getElementById('increaseRepetitionsButton'); 
    const increaseDurationButton = document.getElementById('increaseDurationButton'); 
    const increaseRestTimeButton = document.getElementById('increaseRestTimeButton');

    const routineWorkoutsElement = document.getElementById('routineWorkouts');

    startButton.className = 'workout-button';
    exitButton.className = 'workout-button';
    increaseRepetitionsButton.className = 'workout-button';
    increaseDurationButton.className = 'workout-button';
    increaseRestTimeButton.className = 'workout-button';

    if (!selectedRoutine.workouts) {
        console.error('Error: routine.workouts is undefined');
        routineWorkoutsElement.innerHTML = '<p>No workouts in this routine.</p>';
    } else {
        const tableHTML = `
        <table>
            <tr>
                <th>Workout</th>
                <th>Difficulty</th>
                <th>Muscle Category</th>
            </tr>
            ${selectedRoutine.workouts.map((workout) => {
                // Check if workout is undefined
                if (!workout) {
                    console.error(`Error: workout is undefined`);
                    return '';
                }
    
                return `
                    <tr>
                        <td>${workout.name}</td>
                        <td>${workout.difficulty}</td>
                        <td>${workout.category}</td>
                    </tr>
                `;
            }).join('')}
        </table>
        `;
    
        routineWorkoutsElement.insertAdjacentHTML('beforeend', tableHTML);
    }

    if (startButton) {
        startButton.addEventListener('click', () => {
            startButton.style.display = 'none';

            increaseRepetitionsButton.style.display = 'block';
            increaseDurationButton.style.display = 'block';
            increaseRestTimeButton.style.display = 'block';
    
            startRoutine(selectedRoutine);
        });
    }
  
    if (exitButton) {
        exitButton.addEventListener('click', handleExitButtonClick);
    }
  
    if (increaseRepetitionsButton) {
        increaseRepetitionsButton.style.display = 'none';
    }
    if (increaseDurationButton) {
        increaseDurationButton.style.display = 'none';
    }
    if (increaseRestTimeButton) {
        increaseRestTimeButton.style.display = 'none';
    }
});

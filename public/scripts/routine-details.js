import routines from './routinebank.js';

let restTimerId; // Variable to store the interval ID for the countdown
let increaseRepetitionsCount = 0; // Variable to track the number of times increase repetitions button is clicked
let increaseDurationCount = 0; // Variable to track the number of times increase duration button is clicked
let increaseRestTimeCount = 0; // Variable to track the number of times increase rest time button is clicked
let additionalRepetitions = 0; // Additional repetitions added by the "Increase Repetitions" button
let additionalRestTime = 0; // Additional rest time added by the "Increase Rest Time" button
let additionalDuration = 0; // Additional duration added by the "Increase Duration" button

// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Get the routine name from the URL parameters
const routineName = decodeURIComponent(urlParams.get('name'));

// Find the selected routine in the routines array
const selectedRoutine = routines.find(routine => routine.name === routineName);

async function startRoutine(routine) {
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

    // Iterate over each workout in the routine
    for (let i = 0; i < routine.workouts.length; i++) {
        const workout = routine.workouts[i];
        
        // Scenario 2: Perform the workout
        await performWorkout(workout, i);
  
        // Scenario 3: Rest period (if not the last workout)
        if (i < routine.workouts.length - 1) {
            await startRestTimer(30);
        }
    }
    
    // Scenario 4: Routine completed
    alert(`Congratulations! You have completed your routine: ${routine.name}.`);
    
    window.location.href = '/routines';
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
                    resolve(); // Resolve the promise when durationCount reaches 0
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
                    resolve(); // Resolve the promise when count reaches 0
                }
            }, 4000); // Run every 4 seconds
        }

        // Hide the workout counter for timed workouts and the workout timer for incremental workouts
        if (workout.type === 'timed') {
            workoutCounterElement.style.display = 'none';
        } else if (workout.type === 'incremental') {
            workoutTimerElement.style.display = 'none';
        }
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

window.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton'); 
    const exitButton = document.getElementById('exitButton'); 
    const increaseRepetitionsButton = document.getElementById('increaseRepetitionsButton'); 
    const increaseDurationButton = document.getElementById('increaseDurationButton'); 
    const increaseRestTimeButton = document.getElementById('increaseRestTimeButton');

    startButton.className = 'workout-button';
    exitButton.className = 'workout-button';
    increaseRepetitionsButton.className = 'workout-button';
    increaseDurationButton.className = 'workout-button';
    increaseRestTimeButton.className = 'workout-button';

    if (startButton) {
        startButton.addEventListener('click', () => {
            startButton.style.display = 'none';
    
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

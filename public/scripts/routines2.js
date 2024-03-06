import routines from '../scripts/routinebank.js';

const routinesContainer = document.querySelector('.routines-container');
const searchInput = document.querySelector('#searchBar');

searchInput.addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const filteredRoutines = routines.filter(routine => routine.name.toLowerCase().includes(query));
  displayRoutines(filteredRoutines);
});

function navigateToRoutineDetails(routineName) {
  const encodedName = encodeURIComponent(routineName);
  window.location.href = `routine-details?name=${encodedName}`;
}

// Function to display routines on the page
function displayRoutines(routinesToDisplay) {
  routinesContainer.innerHTML = '';

  routinesToDisplay.forEach(routine => {
    const routineElement = document.createElement('div');
    routineElement.classList.add('routine-card');
    routineElement.innerHTML = `
    <div class="routine-content">
        <h2>${routine.name}</h2>
        <p style="color: black;">${routine.description}</p>
        <p style="color: black;>Progress: ${routine.progressStatus}</p> 
        <button class="resetProgress" style="display: none;">Reset Progress</button>
      </div>
    `;

    // Show the "Reset Progress" button for completed routines
    if (routine.completed) {
      const resetProgressButton = routineElement.querySelector('.resetProgress');
      resetProgressButton.style.display = 'block';

      // Add an event listener to the "Reset Progress" button
      resetProgressButton.addEventListener('click', function() {
        // Reset the routine's status and refresh the page
        routine.completed = false;
        location.reload();
      });
    }

    routineElement.addEventListener('click', function() {
      navigateToRoutineDetails(routine.name);
    });
    routinesContainer.appendChild(routineElement);
  });
}

// Initial display of routines
displayRoutines(routines);
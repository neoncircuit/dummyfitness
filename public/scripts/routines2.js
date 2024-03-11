import routines from '../scripts/routinebank.js';

document.addEventListener('DOMContentLoaded', (event) => {
  const routinesContainer = document.querySelector('.routines-container');
  const searchInput = document.querySelector('#searchBar');
  const pointsElement = document.querySelector('#userPoints');

  function getUser() {
    return fetch(`/api/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include any other headers your server requires for authentication
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Log the data
      return data.user;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  getUser().then(user => {
    console.log(user);
    pointsElement.textContent = `Points: ${user.points}`;
  });

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
          <p style="color: black;">Points: ${routine.totalPoints}</p> 
        </div>
      `;

      routineElement.addEventListener('click', function() {
        navigateToRoutineDetails(routine.name);
      });
      routinesContainer.appendChild(routineElement);
    });
  }

  // Initial display of routines
  displayRoutines(routines);
});
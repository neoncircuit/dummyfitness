import { workouts } from '/scripts/workoutbank2.js';

function navigateToWorkoutDetails(workoutName) {
  const encodedName = encodeURIComponent(workoutName);
  window.location.href = `workout-details?name=${encodedName}`;
}

const workoutsContainer = document.querySelector('.workouts-container');
const filterType = document.getElementById('filterType');
let selectedType = 'All';

// Function to display workouts on the page
function displayWorkouts(filteredWorkouts) {
  workoutsContainer.innerHTML = '';

  filteredWorkouts.forEach(workout => {
    const workoutElement = document.createElement('div');
    workoutElement.classList.add('workout-card', workout.difficulty.toLowerCase());
    workoutElement.innerHTML = `
      <div class="workout-content">
        <h2>${workout.name}</h2>
      </div>
    `;
   
    workoutElement.addEventListener('click', function() {
      navigateToWorkoutDetails(workout.name);
    });
    workoutsContainer.appendChild(workoutElement);
  });
}

// Function to handle user input in the search bar
function handleSearchInput() {
  const searchBar = document.getElementById('searchBar');
  const searchTerm = searchBar.value.trim(); // Remove leading/trailing whitespace

  searchWorkouts(searchTerm);
}

// Function to filter workouts based on search input
function searchWorkouts(searchTerm) {
  const formattedSearchTerm = searchTerm.toLowerCase();

  const filteredWorkouts = workouts.filter(workout => {
    const formattedWorkoutName = workout.name.toLowerCase();
    return formattedWorkoutName.includes(formattedSearchTerm);
  });

  // Check if there's an exact match for the search term
  const exactMatch = workouts.find(workout => workout.name.toLowerCase() === formattedSearchTerm);

  if (exactMatch) {
    // If there's an exact match, prioritize and display only that workout
    displayWorkouts([exactMatch]);
  } else {
    // If no exact match, display all filtered workouts
    displayWorkouts(filteredWorkouts);
  }
}

// Function to apply filters based on dropdown selection
function applyFilters(selectedValue, type) {
  let filtered = workouts;

  if (selectedValue !== 'All') {
    if (type === 'Difficulty') {
      filtered = workouts.filter(workout => workout.difficulty === selectedValue);
    } else if (type === 'Category') {
      filtered = workouts.filter(workout => workout.category === selectedValue);
    }
  }
  displayWorkouts(filtered);
}

// Function to populate dropdown options
function populateDropdownOptions(options) {
  const filterDropdowns = document.getElementById('filterDropdowns');
  filterDropdowns.innerHTML = '';

  const select = document.createElement('select');
  options.forEach(option => {
    const optionElem = document.createElement('option');
    optionElem.value = option;
    optionElem.textContent = option;
    select.appendChild(optionElem);
  });

  filterDropdowns.appendChild(select);

  select.addEventListener('input', function() {
    const selectedValue = this.value;
    applyFilters(selectedValue, selectedType);
  });
}

// Event listeners
filterType.addEventListener('input', function() {
  selectedType = this.value;

  let options = ['All'];
  if (selectedType === 'Difficulty') {
    options.push(...new Set(workouts.map(workout => workout.difficulty)));
  } else if (selectedType === 'Category') {
    options.push(...new Set(workouts.map(workout => workout.category)));
  }

  const filterDropdowns = document.getElementById('filterDropdowns');

  if (selectedType === 'All') {
    filterDropdowns.style.display = 'none';
    applyFilters('All', selectedType);
  } else {
    populateDropdownOptions(options);
    filterDropdowns.style.display = 'block';
    applyFilters('All', selectedType);
  }
});

// Additional event listener for the search bar
document.getElementById('searchBar').addEventListener('input', handleSearchInput);

// Initial display of workouts
displayWorkouts(workouts);

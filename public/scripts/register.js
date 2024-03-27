// Fetch the countries data
fetch('/data/countries.json')
  .then(response => response.json())
  .then(countries => {
    const regions = [...new Set(countries.map(country => country.region))];
    const regionSelect = document.getElementById('new-region');
    regions.forEach(region => {
      const option = document.createElement('option');
      option.value = region;
      option.text = region;
      regionSelect.appendChild(option);
    });

    // Update the country dropdown when a region is selected
    regionSelect.addEventListener('change', function(event) {
      const region = event.target.value;
      const countriesInRegion = countries.filter(country => country.region === region);
      const countrySelect = document.getElementById('new-country');

      // Clear the countries dropdown
      while (countrySelect.firstChild) {
        countrySelect.removeChild(countrySelect.firstChild);
      }

      // Add an option for each country in the selected region
      countriesInRegion.forEach(country => {
        const option = document.createElement('option');
        option.value = country.name;
        option.text = country.name;
        countrySelect.appendChild(option);
      });
    });
});


document.getElementById('register-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const firstName = document.getElementById('new-first-name').value;
  const lastName = document.getElementById('new-last-name').value;

  const username = document.getElementById('new-username').value;
  const password = document.getElementById('new-password').value;
  const email = document.getElementById('new-email').value; 

  // Extract the values from the new input fields
  const region = document.getElementById('new-region').value;
  const country = document.getElementById('new-country').value;
  const age = document.getElementById('new-age').value;
  const exerciseFrequency = document.getElementById('new-exercise-frequency').value;
  const fitnessGoals = document.getElementById('new-fitness-goals').value;

  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email, 
      firstName: firstName,
      lastName: lastName,
      region: region,
      country: country,
      age: age,
      exerciseFrequency: exerciseFrequency,
      fitnessGoals: fitnessGoals,
    }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('User registered: ', data);
    window.location.href = '/login';
  })
  .catch((error) => {
    console.error('Error:', error);
    document.getElementById('error-message').textContent = 'Username, password, or email have already been registered.';
  });
});

document.getElementById('password-toggle').addEventListener('change', function(event) {
  const passwordInput = document.getElementById('new-password');
  if (event.target.checked) {
    passwordInput.type = 'text'; // Show password
  } else {
    passwordInput.type = 'password'; // Hide password
  }
});


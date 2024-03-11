const exerciseFrequencyOptions = {
    1: 'Sedentary (little or no exercise)',
    2: 'Lightly active (light exercise/sports 1-3 days/week)',
    3: 'Moderately active (moderate exercise/sports 3-5 days/week)',
    4: 'Very active (hard exercise/sports 6-7 days a week)',
    5: 'Super active (very hard exercise/physical job & exercise 2x/day)',
};

window.onload = async function() {
    const response = await fetch('/user');
    const user = await response.json();

    const regionSelect = document.getElementById('region');
    const countrySelect = document.getElementById('country');

    // Fetch the countries and regions from the JSON file
    const responseCountries = await fetch('/data/countries.json');
    const countries = await responseCountries.json();

    // Create a map of regions to countries
    const countriesByRegion = {};
    for (const country of countries) {
        if (!countriesByRegion[country.region]) {
            countriesByRegion[country.region] = [];
        }
        countriesByRegion[country.region].push(country.name);
    }

    // Display the user's information in the page
    const userInfoDiv = document.getElementById('user-info');
    userInfoDiv.innerHTML = `
        <p>Username: ${user.username}</p>
        <p>Email: ${user.email}</p>
        <p>First Name: ${user.firstName}</p>
        <p>Last Name: ${user.lastName}</p>
        <p>Country: ${user.country}</p>
        <p>Age: ${user.age}</p>
        <p>Exercise Frequency: ${exerciseFrequencyOptions[user.exerciseFrequency]}</p>
        <p>Fitness Goals: ${user.fitnessGoals}</p>       
    `;

    // Pre-fill the form with the user's information
    document.getElementById('username').value = user.username;
    document.getElementById('email').value = user.email;
    document.getElementById('firstName').value = user.firstName;
    document.getElementById('lastName').value = user.lastName;
    document.getElementById('age').value = user.age;
    document.getElementById('exerciseFrequency').value = user.exerciseFrequency;
    document.getElementById('fitnessGoals').value = user.fitnessGoals;

    // // Populate the region select with the regions
    // if (regionSelect.options.length === 0) { // Check if options already exist
    //     for (const region in countriesByRegion) {
    //         const option = document.createElement('option');
    //         option.value = region;
    //         option.text = region;
    //         regionSelect.add(option);
    //     }
    // }
    
    // // Set the default region and country
    // if (countriesByRegion[user.region]) {
    //     regionSelect.value = user.region;
    //     //countrySelect.value = user.country;
    // }

    // countrySelect.value = user.country;

    // regionSelect.onchange = function() {
    //     const selectedRegion = this.value;

    //     // Clear the country select
    //     countrySelect.innerHTML = '';

    //     if (countriesByRegion[selectedRegion]) {
    //         // Add an option for each country in the selected region
    //         const countries = countriesByRegion[selectedRegion];
    //         for (const country of countries) {
    //             const option = document.createElement('option');
    //             option.value = country;
    //             option.text = country;
    //             countrySelect.add(option);
    //         }
    //     }
    // };

    // Populate the region select with the regions
    let populateRegions = new Promise((resolve, reject) => {
        if (regionSelect.options.length === 0) { // Check if options already exist
            for (const region in countriesByRegion) {
                const option = document.createElement('option');
                option.value = region;
                option.text = region;
                regionSelect.add(option);
            }
        }
        resolve();
    });

    populateRegions.then(() => {
        // Set the default region
        regionSelect.value = user.region;

        regionSelect.onchange = function() {
            const selectedRegion = this.value;

            // Clear the country select
            countrySelect.innerHTML = '';

            if (countriesByRegion[selectedRegion]) {
                // Add an option for each country in the selected region
                const countries = countriesByRegion[selectedRegion];
                for (const country of countries) {
                    const option = document.createElement('option');
                    option.value = country;
                    option.text = country;
                    countrySelect.add(option);
                }
            }

            // Set the default country if the selected region is the user's region
            if (selectedRegion === user.region) {
                countrySelect.value = user.country;
            }
        };

        // Trigger the onchange event to populate the country select
        regionSelect.dispatchEvent(new Event('change'));
    });

    const editProfileButton = document.getElementById('edit-profile-button');
    const form = document.getElementById('edit-user-form');

    editProfileButton.onclick = function() {
        // Show the form when the "Edit Profile" button is clicked
        form.style.display = 'block';
    };

    form.onsubmit = async function(event) {
        event.preventDefault();

        // Get the updated information from the form
        const updatedUser = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            country: document.getElementById('country').value,
            age: document.getElementById('age').value,
            exerciseFrequency: document.getElementById('exerciseFrequency').value,
            fitnessGoals: document.getElementById('fitnessGoals').value,
        };

        const response = await fetch('/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        });

        const updatedUserFromServer = await response.json();

        // Update the displayed information with the updated information
        userInfoDiv.innerHTML = `
            <p>Username: ${updatedUserFromServer.username}</p>
            <p>Email: ${updatedUserFromServer.email}</p>
            <p>First Name: ${updatedUserFromServer.firstName}</p>
            <p>Last Name: ${updatedUserFromServer.lastName}</p>
            <p>Country: ${updatedUserFromServer.country}</p>
            <p>Age: ${updatedUserFromServer.age}</p>
            <p>Exercise Frequency: ${exerciseFrequencyOptions[updatedUserFromServer.exerciseFrequency]}</p>
            <p>Fitness Goals: ${updatedUserFromServer.fitnessGoals}</p>
        `;

        form.style.display = 'none';
    };
};
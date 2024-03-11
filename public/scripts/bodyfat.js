document.addEventListener('DOMContentLoaded', function() {
    const unitInput = document.getElementById('unit');
    const genderInput = document.getElementById('gender');
    const ageInput = document.getElementById('age');
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const neckInput = document.getElementById('neck');
    const waistInput = document.getElementById('waist');
    const hipInput = document.getElementById('hip');
    const hipContainer = document.getElementById('hip-container');
    const resultElement = document.getElementById('result');

    unitInput.addEventListener('change', function() {
        convertUnits();
        calculateAndUpdateBodyFat();
    });

    genderInput.addEventListener('change', function() {
        calculateAndUpdateBodyFat();
        updateHipInputVisibility(); 
    });

    ageInput.addEventListener('input', calculateAndUpdateBodyFat);
    weightInput.addEventListener('input', calculateAndUpdateBodyFat);
    heightInput.addEventListener('input', calculateAndUpdateBodyFat);
    neckInput.addEventListener('input', calculateAndUpdateBodyFat);
    waistInput.addEventListener('input', calculateAndUpdateBodyFat);
    hipInput.addEventListener('input', calculateAndUpdateBodyFat);

    function convertUnits() {
        const unit = unitInput.value;
        if (unit === 'imperial') {
            weightInput.value = (parseFloat(weightInput.value) * 2.20462).toFixed(2);
            heightInput.value = (parseFloat(heightInput.value) * 0.393701).toFixed(2);
            neckInput.value = (parseFloat(neckInput.value) * 0.393701).toFixed(2);
            waistInput.value = (parseFloat(waistInput.value) * 0.393701).toFixed(2);
            hipInput.value = (parseFloat(hipInput.value) * 0.393701).toFixed(2);
        } else if (unit === 'metric') {
            weightInput.value = (parseFloat(weightInput.value) * 0.453592).toFixed(2);
            heightInput.value = (parseFloat(heightInput.value) * 2.54).toFixed(2);
            neckInput.value = (parseFloat(neckInput.value) * 2.54).toFixed(2);
            waistInput.value = (parseFloat(waistInput.value) * 2.54).toFixed(2);
            hipInput.value = (parseFloat(hipInput.value) * 2.54).toFixed(2);
        }
    }
    
    function updateHipInputVisibility() {
        if (genderInput.value === 'female') {
            hipContainer.style.display = 'block'; 
        } else {
            hipContainer.style.display = 'none'; 
        }
    }

    function calculateAndUpdateBodyFat() {
        const unit = unitInput.value;
        const gender = genderInput.value;
        let age = parseInt(ageInput.value);
        let weight = parseFloat(weightInput.value);
        let height = parseFloat(heightInput.value);
        let neck = parseFloat(neckInput.value);
        let waist = parseFloat(waistInput.value);
        let hip = parseFloat(hipInput.value);

        let errorMessage = '';

        if (!gender || isNaN(age) || isNaN(weight) || isNaN(height) || isNaN(neck) || isNaN(waist) || (gender === 'female' && isNaN(hip))) {
            errorMessage += 'Please enter values in all fields.<br>';
        }
        if (unit === 'metric') {
            if (weight < 30 || weight > 300) {
                errorMessage += 'Please enter a valid weight between 30 and 300 kg.<br>';
            }
            if (height < 100 || height > 250) {
                errorMessage += 'Please enter a valid height between 100 and 250 cm.<br>';
            }
            if (neck < 20 || neck > 60) {
                errorMessage += 'Please enter a valid neck measurement between 20 and 60 cm.<br>';
            }
            if (waist < 50 || waist > 150) {
                errorMessage += 'Please enter a valid waist measurement between 50 and 150 cm.<br>';
            }
            if (gender === 'female' && (hip < 50 || hip > 150)) {
                errorMessage += 'Please enter a valid hip measurement between 50 and 150 cm.<br>';
            }
        } else if (unit === 'imperial') {
            if (weight < 66 || weight > 660) {
                errorMessage += 'Please enter a valid weight between 66 and 660 lbs.<br>';
            }
            if (height < 39 || height > 98) {
                errorMessage += 'Please enter a valid height between 39 and 98 in.<br>';
            }
            if (neck < 8 || neck > 24) {
                errorMessage += 'Please enter a valid neck measurement between 8 and 24 in.<br>';
            }
            if (waist < 20 || waist > 59) {
                errorMessage += 'Please enter a valid waist measurement between 20 and 59 in.<br>';
            }
            if (gender === 'female' && (hip < 20 || hip > 59)) {
                errorMessage += 'Please enter a valid hip measurement between 20 and 59 in.<br>';
            }
        }

        if (errorMessage) {
            resultElement.innerHTML = errorMessage;
            return;
        }

        // Calculate body fat using US Navy method
        let bodyFatNavy;
        if (gender === 'male') {
            if (unit === 'metric') {
                bodyFatNavy = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
            } else {
                // Convert measurements to cm for the formula
                bodyFatNavy = 495 / (1.0324 - 0.19077 * Math.log10((waist * 2.54) - (neck * 2.54)) + 0.15456 * Math.log10(height * 2.54)) - 450;
            }
        } else {
            if (unit === 'metric') {
                bodyFatNavy = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
            } else {
                // Convert measurements to cm for the formula
                bodyFatNavy = 495 / (1.29579 - 0.35004 * Math.log10((waist * 2.54) + (hip * 2.54) - (neck * 2.54)) + 0.22100 * Math.log10(height * 2.54)) - 450;
            }
        }

        // Calculate body fat using BMI method
        let bodyFatBMI;
        if (unit === 'metric') {
            const bmi = weight / Math.pow(height / 100, 2);
            bodyFatBMI = gender === 'male' ? 1.20 * bmi + 0.23 * age - 16.2 : 1.20 * bmi + 0.23 * age - 5.4;
        } else {
            const bmi = 703 * weight / Math.pow(height, 2);
            bodyFatBMI = gender === 'male' ? 1.20 * bmi + 0.23 * age - 16.2 : 1.20 * bmi + 0.23 * age - 5.4;
        }

        // Calculate ideal body fat for given age (Jackson & Pollock)
        let idealBodyFat;
        if (gender === 'male') {
            switch (true) {
                case (age <= 20):
                    idealBodyFat = 8.5;
                    break;
                case (age <= 25):
                    idealBodyFat = 10.5;
                    break;
                case (age <= 30):
                    idealBodyFat = 12.7;
                    break;
                case (age <= 35):
                    idealBodyFat = 13.7;
                    break;
                case (age <= 40):
                    idealBodyFat = 15.3;
                    break;
                case (age <= 45):
                    idealBodyFat = 16.4;
                    break;
                case (age <= 50):
                    idealBodyFat = 18.9;
                    break;
                default:
                    idealBodyFat = 20.9;
            }
        } else { // female
            switch (true) {
                case (age <= 20):
                    idealBodyFat = 17.7;
                    break;
                case (age <= 25):
                    idealBodyFat = 18.4;
                    break;
                case (age <= 30):
                    idealBodyFat = 19.3;
                    break;
                case (age <= 35):
                    idealBodyFat = 21.5;
                    break;
                case (age <= 40):
                    idealBodyFat = 22.2;
                    break;
                case (age <= 45):
                    idealBodyFat = 22.9;
                    break;
                case (age <= 50):
                    idealBodyFat = 25.2;
                    break;
                default:
                    idealBodyFat = 26.3;
            }
        }

        // Calculate body fat mass
        const bodyFatMass = weight * bodyFatNavy / 100;

        // Calculate lean body mass
        const leanBodyMass = weight - bodyFatMass;

        // Calculate body fat required to lose to reach ideal weight
        const bodyFatToLose = bodyFatMass - weight * idealBodyFat / 100;

        // Display the results
        resultElement.innerHTML = `
            Body Fat (US Navy Method): ${bodyFatNavy.toFixed(2)}%<br>
            Body Fat (BMI Method): ${bodyFatBMI.toFixed(2)}%<br>
            Ideal Body Fat for Given Age (Jackson & Pollock): ${idealBodyFat.toFixed(2)}%<br>
            Body Fat Mass: ${bodyFatMass.toFixed(2)} ${unit === 'metric' ? 'kg' : 'lbs'}<br>
            Lean Body Mass: ${leanBodyMass.toFixed(2)} ${unit === 'metric' ? 'kg' : 'lbs'}<br>
            Body Fat Required to Lose to Reach Ideal Weight: ${bodyFatToLose.toFixed(2)} ${unit === 'metric' ? 'kg' : 'lbs'}
        `;
    }

    updateHipInputVisibility();
});
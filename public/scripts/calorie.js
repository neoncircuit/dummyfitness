document.addEventListener('DOMContentLoaded', function() {
    const ageInput = document.getElementById('age');
    const genderInput = document.getElementById('gender');
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const activityLevelInput = document.getElementById('activityLevel');
    const resultElement = document.getElementById('result');
    const unitDropdown = document.getElementById('unitToggle');
  
    const resultUnitDropdown = document.getElementById('resultUnit');
    const formulaDropdown = document.getElementById('formula');
    const bodyFatInput = document.getElementById('bodyFat');

    formulaDropdown.addEventListener('change', function() {
        const bodyFatInputGroup = document.getElementById('bodyFatInputGroup');
        if (formulaDropdown.value === 'katchMcArdle') {
          bodyFatInputGroup.style.display = 'block';
        } else {
          bodyFatInputGroup.style.display = 'none';
        }
    });

    ageInput.addEventListener('input', function() {
        calculateAndUpdateCalories(unitDropdown.value, resultUnitDropdown.value, formulaDropdown.value);
    });
    
    genderInput.addEventListener('change', function() {
        calculateAndUpdateCalories(unitDropdown.value, resultUnitDropdown.value, formulaDropdown.value);
    });
    
    weightInput.addEventListener('input', function() {
        calculateAndUpdateCalories(unitDropdown.value, resultUnitDropdown.value, formulaDropdown.value);
    });
    
    heightInput.addEventListener('input', function() {
        calculateAndUpdateCalories(unitDropdown.value, resultUnitDropdown.value, formulaDropdown.value);
    });
    
    activityLevelInput.addEventListener('change', function() {
        calculateAndUpdateCalories(unitDropdown.value, resultUnitDropdown.value, formulaDropdown.value);
    });
    
    unitDropdown.addEventListener('change', function() {
        convertUnits();
        calculateAndUpdateCalories(unitDropdown.value, resultUnitDropdown.value, formulaDropdown.value);
    });
    
    resultUnitDropdown.addEventListener('change', function() {
        calculateAndUpdateCalories(unitDropdown.value, resultUnitDropdown.value, formulaDropdown.value);
    });
    
    formulaDropdown.addEventListener('change', function() {
        calculateAndUpdateCalories(unitDropdown.value, resultUnitDropdown.value, formulaDropdown.value);
    });
    
    bodyFatInput.addEventListener('input', function() {
        calculateAndUpdateCalories(unitDropdown.value, resultUnitDropdown.value, formulaDropdown.value);
    });
  
    function convertUnits() {
        const unit = unitDropdown.value;
        if (unit === 'imperial') {
            weightInput.value = (parseFloat(weightInput.value) * 2.20462).toFixed(2);
            heightInput.value = (parseFloat(heightInput.value) * 0.393701).toFixed(2);
        } else if (unit === 'metric') {
            weightInput.value = (parseFloat(weightInput.value) * 0.453592).toFixed(2);
            heightInput.value = (parseFloat(heightInput.value) * 2.54).toFixed(2);
        }
    }

    function calculateAndUpdateCalories(unitType, resultUnit, formula) {
        const age = parseInt(ageInput.value);
        const gender = genderInput.value;
        let weight = parseFloat(weightInput.value);
        let height = parseFloat(heightInput.value);
        const activityLevel = parseFloat(activityLevelInput.value);
    
        // Get the body fat percentage
        const bodyFatPercentage = parseFloat(bodyFatInput.value);
    
        const errors = [];

        if (isNaN(age) || isNaN(weight) || isNaN(height) || isNaN(activityLevel)) {
        errors.push('Please enter valid values for all fields.');
        }

        if (age < 12 || age > 80) {
        errors.push('Please enter a valid age between 12 and 80.');
        }

        if (unitType === 'imperial') {
            if (weight < 66 || weight > 661) {
                errors.push('Please enter a valid weight between 66 and 661 lbs.');
            }
            if (height < 39 || height > 98) {
                errors.push('Please enter a valid height between 39 and 98 inches.');
            }
            weight = weight * 0.453592;
            height = height * 2.54;
        } else {
            if (weight < 30 || weight > 300) {
                errors.push('Please enter a valid weight between 30 and 300 kg.');
            }
            if (height < 100 || height > 250) {
                errors.push('Please enter a valid height between 100 and 250 cm.');
            }
        }
        if (activityLevel < 1 || activityLevel > 5) {
        errors.push('Please enter a valid activity level between 1 and 5.');
        }
        if (formula === 'katchMcArdle' && (isNaN(bodyFatPercentage) || bodyFatPercentage < 1 || bodyFatPercentage > 75)) {
        errors.push('Please enter a valid body fat percentage between 1 and 75.');
        }

        if (errors.length > 0) {
            resultElement.innerHTML = errors.join('<br>');
            return;
        }

        // Calculate the BMR based on the selected formula
        let bmr;

        if (formula === 'mifflinStJeor') {
            bmr = calculateMifflinStJeorBMR(age, gender, weight, height);
        } else if (formula === 'revisedHarrisBenedict') {
            bmr = calculateRevisedHarrisBenedictBMR(age, gender, weight, height);
        } else { // Katch-McArdle
            bmr = calculateKatchMcArdleBMR(weight, bodyFatPercentage);
        }

        // Calculate the TDEE
        const tdee = calculateTDEE(bmr, activityLevel);

        // Convert the TDEE to kilojoules if the selected result unit is kilojoules
        const tdeeInSelectedUnit = resultUnit === 'kilojoules' ? tdee * 4.184 : tdee;

        // Display the result
        resultElement.innerHTML = `You need to consume about<br><span class="highlight">${tdeeInSelectedUnit.toFixed(2)} ${resultUnit} per day</span><br> to maintain your current weight.`;
    }
  
    function calculateMifflinStJeorBMR(age, gender, weight, height) {
        // Mifflin St Jeor formula
        return gender === 'male' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;
    }

    function calculateRevisedHarrisBenedictBMR(age, gender, weight, height) {
        // Revised Harris-Benedict formula
        return gender === 'male' ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age : 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;
    }

    function calculateKatchMcArdleBMR(weight, bodyFatPercentage) {
        // Katch-McArdle formula
        const leanBodyMass = weight * (1 - bodyFatPercentage / 100);
        return 370 + 21.6 * leanBodyMass;
    }

    function calculateTDEE(bmr, activityLevel) {
        let multiplier;
    
        switch(activityLevel) {
            case 1: // Sedentary (little or no exercise)
                multiplier = 1.2;
                break;
            case 2: // Lightly active (light exercise/sports 1-3 days/week)
                multiplier = 1.375;
                break;
            case 3: // Moderately active (moderate exercise/sports 3-5 days/week)
                multiplier = 1.55;
                break;
            case 4: // Very active (hard exercise/sports 6-7 days a week)
                multiplier = 1.725;
                break;
            case 5: // Super active (very hard exercise/physical job & exercise 2x/day)
                multiplier = 1.9;
                break;
            default:
                multiplier = 1.2;
        }
    
        return bmr * multiplier;
    }
});
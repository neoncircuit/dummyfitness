document.addEventListener('DOMContentLoaded', function() {
  const unitDropdown = document.getElementById('unitToggle');
  const weightInput = document.getElementById('weight');
  const heightInput = document.getElementById('height');
  const resultElement = document.getElementById('result');

  unitDropdown.addEventListener('change', function() {
    convertUnits();
    calculateAndUpdateBMI(unitDropdown.value);
  });

  weightInput.addEventListener('input', function() {
    validateInput(weightInput);
    calculateAndUpdateBMI(unitDropdown.value);
  });

  heightInput.addEventListener('input', function() {
    validateInput(heightInput);
    calculateAndUpdateBMI(unitDropdown.value);
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

  function validateInput(input) {
    const value = parseFloat(input.value);
    if (isNaN(value) || value <= 0 || value > 1000) {
      input.setCustomValidity('Please enter a valid value.');
    } else {
      input.setCustomValidity('');
    }
  }

  function calculateAndUpdateBMI(unitType) {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      resultElement.textContent = 'Please enter valid values for weight and height.';
    } else {
      let weightRangeMessage = '';
      let heightRangeMessage = '';

      if (unitType === 'metric') {
        if (weight < 30 || weight > 300) {
          weightRangeMessage = 'Weight should be between 30kg and 300kg.';
        }
        if (height < 100 || height > 250) {
          heightRangeMessage = 'Height should be between 100cm and 250cm.';
        }
      } else if (unitType === 'imperial') {
        if (weight < 66 || weight > 660) {
          weightRangeMessage = 'Weight should be between 66lbs and 660lbs.';
        }
        if (height < 39 || height > 98) {
          heightRangeMessage = 'Height should be between 39in and 98in.';
        }
      }

      if (weightRangeMessage !== '' || heightRangeMessage !== '') {
        resultElement.innerHTML = `<pre>${weightRangeMessage}\n${heightRangeMessage}</pre>`;
      } else {
        const bmi = calculateBMI(weight, height, unitType);
        const { message, bmiClass } = getBMIDescription(bmi);
        resultElement.innerHTML = `<pre style="white-space: pre-wrap; width: 80%;">Your BMI is <span class="${bmiClass}">${bmi.toFixed(2)}.\n${message}</pre>`;
      }
    }
  }


  function calculateBMI(weight, height, unitType) {
    let bmi;

    if (unitType === 'metric') {
      // Calculation for metric units
      bmi = weight / ((height / 100) ** 2);
    } else if (unitType === 'imperial') {
      // Calculation for imperial units
      // Convert height from inches to meters and weight from pounds to kg
      const heightInMeters = height * 0.0254;
      const weightInKg = weight * 0.453592;
      bmi = weightInKg / (heightInMeters ** 2);
    }

    return bmi;
  }

  function getBMIDescription(bmi) {
    let message = '';
    let bmiClass = '';
    if (bmi < 18.5) {
      message = 'You are underweight. <br> Consider gaining weight in a healthy way by focusing on nutrient-dense foods and strength training exercises.';
      bmiClass = 'underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      message = 'You have a healthy weight. <br> Keep up the good work by maintaining a balanced diet and regular exercise routine!';
      bmiClass = 'healthy';
    } else if (bmi >= 25.0 && bmi <= 29.9) {
      message = 'You are overweight. <br> Start incorporating healthier food choices and regular physical activity to achieve a healthier weight.';
      bmiClass = 'overweight';
    } else {
      message = 'You are obese. <br> It is important to prioritize your health by consulting a healthcare professional for guidance on diet and exercise.';
      bmiClass = 'obesity';
    }
    return { message, bmiClass };
  }
});

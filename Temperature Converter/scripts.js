document.addEventListener('DOMContentLoaded', function () {
  const temperatureInput = document.getElementById('temperature');
  const fromUnitSelect = document.getElementById('fromUnit');
  const toUnitSelect = document.getElementById('toUnit');
  const convertBtn = document.getElementById('convertBtn');
  const resultParagraph = document.getElementById('result');

  // Function to validate input and enable the button
  function validateInputs() {
    const temperature = temperatureInput.value;
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;

    const isValid = temperature !== '' && !isNaN(Number(temperature)) && fromUnit !== '' && toUnit !== '';
    convertBtn.disabled = !isValid;
  }

  // Event listeners for the inputs
  temperatureInput.addEventListener('input', validateInputs);
  fromUnitSelect.addEventListener('change', validateInputs);
  toUnitSelect.addEventListener('change', validateInputs);

  // Function to perform the temperature conversion
  function convertTemperature() {
    let temperature = parseFloat(temperatureInput.value);
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;

    let inCelsius;

    // Convert to Celsius first if needed
    switch (fromUnit) {
      case 'Fahrenheit':
        inCelsius = (temperature - 32) * (5 / 9);
        break;
      case 'Kelvin':
        inCelsius = temperature - 273.15;
        break;
      default:
        inCelsius = temperature;
    }

    let converted;

    // Convert from Celsius to the target unit
    switch (toUnit) {
      case 'Fahrenheit':
        converted = (inCelsius * 9 / 5) + 32;
        break;
      case 'Kelvin':
        converted = inCelsius + 273.15;
        // Nếu kết quả chuyển đổi sang Kelvin dưới 0 K, hiển thị thông báo lỗi
        if (converted < 0) {
          resultParagraph.textContent = "Temperature cannot be below absolute zero (0 K).";
          return;  // Ngừng nếu giá trị chuyển đổi sang Kelvin dưới 0 K
        }
        break;
      default:
        converted = inCelsius;
    }

    // Hiển thị kết quả
    resultParagraph.textContent = `${temperature} ${fromUnit} is ${converted.toFixed(1)} ${toUnit}`;
  }

  // Event listener for the convert button
  convertBtn.addEventListener('click', convertTemperature);
});

const apiKey = 'NU72ZVK6KXXWUBGYUFTSTCRU6';
const apiUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
const geoApiUrl = 'https://geocoding-api.open-meteo.com/v1/search';

const locationInput = document.getElementById('location-input');
const searchBtn = document.getElementById('search-btn');
const refreshBtn = document.getElementById('refresh-btn');
const weatherDetails = document.getElementById('weather-details');
const suggestionsBox = document.getElementById('suggestions');

// Fetch weather data including 24 hours past and future
async function fetchWeather(location) {
    try {
        const response = await fetch(`${apiUrl}/${location}?unitGroup=metric&key=${apiKey}&contentType=json`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherDetails.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
    }
}

// Display weather details including past and future 24 hours
function displayWeather(data) {
    const { address, days } = data;
    const currentConditions = data.currentConditions;

    let forecastHtml = `<h2>Weather in ${address}</h2>`;
    forecastHtml += `
        <div class="current-conditions">
            <p><strong>Now:</strong> ${currentConditions.temp}°C, ${currentConditions.conditions}</p>
        </div>`;

    forecastHtml += '<h3>Past 24 Hours</h3><div class="forecast">';
    const pastHours = days[0].hours.slice(-24); // Last 24 hours from the first day
    pastHours.forEach(hour => {
        forecastHtml += `<div>${hour.datetime}: ${hour.temp}°C, ${hour.conditions}</div>`;
    });
    forecastHtml += '</div>';

    forecastHtml += '<h3>Next 24 Hours</h3><div class="forecast">';
    const futureHours = days[1].hours.slice(0, 24); // First 24 hours from the second day
    futureHours.forEach(hour => {
        forecastHtml += `<div>${hour.datetime}: ${hour.temp}°C, ${hour.conditions}</div>`;
    });
    forecastHtml += '</div>';

    weatherDetails.innerHTML = forecastHtml;
}

// Fetch suggestions using the geocoding API
async function fetchSuggestions(query) {
    if (!query) {
        suggestionsBox.style.display = 'none';
        return;
    }

    try {
        const response = await fetch(`${geoApiUrl}?name=${query}`);
        const data = await response.json();
        displaySuggestions(data.results || []);
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        suggestionsBox.style.display = 'none';
    }
}

// Display suggestions
function displaySuggestions(suggestions) {
    if (suggestions.length === 0) {
        suggestionsBox.style.display = 'none';
        return;
    }

    suggestionsBox.innerHTML = suggestions
        .map(suggestion => `<div>${suggestion.name}, ${suggestion.country}</div>`)
        .join('');
    suggestionsBox.style.display = 'block';

    suggestionsBox.querySelectorAll('div').forEach(item => {
        item.addEventListener('click', () => {
            locationInput.value = item.textContent;
            suggestionsBox.style.display = 'none';
        });
    });
}

// Event listeners
searchBtn.addEventListener('click', () => fetchWeather(locationInput.value));
locationInput.addEventListener('input', () => fetchSuggestions(locationInput.value));
refreshBtn.addEventListener('click', () => fetchWeather(locationInput.value));

const apiKey = 'cb6538f8a8fc4df1be492634250201';
const apiUrl = 'http://api.weatherapi.com/v1/current.json?';

async function getWeather() {
  const location = document.getElementById('location').value;
  const errorMessage = document.getElementById('error-message');
  const weatherInfo = document.getElementById('weather-info');
  const locationName = document.getElementById('location-name');
  const temperature = document.getElementById('temperature');
  const condition = document.getElementById('condition');

  if (!location) {
    errorMessage.textContent = 'Please enter a location!';
    weatherInfo.style.display = 'none';
    return;
  }

  try {
    const response = await fetch(`${apiUrl}key=${apiKey}&q=${location}&aqi=yes`);
    const data = await response.json();

    if (data.error) {
      errorMessage.textContent = 'Location not found! Please try again.';
      weatherInfo.style.display = 'none';
    } else {
      errorMessage.textContent = '';
      weatherInfo.style.display = 'block';
      locationName.textContent = `${data.location.name}, ${data.location.country}`;
      temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
      condition.textContent = `Condition: ${data.current.condition.text}`;
    }
  } catch (error) {
    errorMessage.textContent = 'Failed to fetch weather data. Please try again.';
    weatherInfo.style.display = 'none';
  }
}

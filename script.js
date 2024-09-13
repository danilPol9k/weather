const account = document.querySelector('.account');
const popup = document.querySelector('.account-popup');

function showPopup() {
  popup.style.display = 'block';
}
function hidePopup() {
  popup.style.display = 'none';
}

account.addEventListener('mouseover', showPopup);

account.addEventListener('mouseout', function (event) {
  if (!popup.contains(event.relatedTarget)) {
    hidePopup();
  }
});

popup.addEventListener('mouseover', showPopup);

popup.addEventListener('mouseout', function (event) {
  if (!account.contains(event.relatedTarget)) {
    hidePopup();
  }
});

document.getElementById('search-button').addEventListener('click', function () {
  let city = document.getElementById('city-input').value;
  getWeather(city);
});

function getWeather(city) {
  let apiKey = '3fcedb5ea7564669de55422cab720163';
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=ru`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error('Ошибка:', error);
      document.getElementById('weather-data').textContent = 'Не удалось получить данные о погоде.';
    });
}

function displayWeather(data) {
  let weatherDiv = document.getElementById('weather-data');
  let temperatureCelsius = Math.round(data.main.temp - 273.15);
  let feelsLikeCelsius = Math.round(data.main.feels_like - 273.15);
  let windSpeedMetersPerSecond = (data.wind.speed).toFixed(2);
  let rainChance = data.rain ? (data.rain['1h'] / 1 * 100).toFixed(0) : '0';
  let sunrise = new Date(data.sys.sunrise * 1000);
  let sunriseTime = sunrise.getHours() + ':' + (sunrise.getMinutes() < 10 ? '0' : '') + sunrise.getMinutes()
  let weatherCondition = data.weather[0].main;
  let precipitationPercentage;
  switch (weatherCondition) {
    case 'Clear':
      precipitationPercentage = '0%';
      break;
    case 'Clouds':
      precipitationPercentage = '20%';
      break;
    case 'Rain':
      precipitationPercentage = '80%';
      break;
    default:
      precipitationPercentage = 'Неизвестно';
  }

  document.querySelector('.weather-block__temp').textContent = `${temperatureCelsius}°`;
  document.querySelector('.weather-block__feelTemp').textContent = `ощущается как ${feelsLikeCelsius}°`;
  document.querySelector('.weather-block__city').textContent = data.name;
  document.querySelector('.sunrise-time').textContent = sunriseTime;
  document.querySelector('.wind-speed').textContent = `${windSpeedMetersPerSecond} м/с`;
  document.querySelector('.probability-percent').textContent = `${rainChance}%`;
}

// weather API
let city = "Zürich";
let celsius = 0;
let feelsLike = 0;
let humidity = `0%`;
let windspeed = 0;
let clouds = 0;
let lat = 0;
let long = 0;

let apiKey = "ca867a1ff9a2ba4fcae7d290754eb99e";

function loadWeatherData() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function loadLocationWeatherData() {
  let locationApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric`;
  axios.get(`${locationApiUrl}&appid=${apiKey}`).then(showTemperature);
}

// shows of temperature and percent data in result container
function showTemperature(response) {
  console.log(response);
  celsius = Math.round(response.data.main.temp);
  feelsLike = Math.round(response.data.main.feels_like);
  humidity = response.data.main.humidity;
  windspeed = response.data.wind.speed;
  clouds = response.data.clouds.all;
  city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;

  setCelsius();
}

// shows temperature in celsius in h2 result container
function setCelsius() {
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${celsius}°C`;
  percentData();
}
// shows percent data
function percentData() {
  let listFeel = document.querySelector("#feel");
  listFeel.innerHTML = `Feels like: ${feelsLike} °C`;
  let listHumidity = document.querySelector("#humidity");
  listHumidity.innerHTML = `Humidity: ${humidity} %`;
  let listWindspeed = document.querySelector("#windspeed");
  listWindspeed.innerHTML = `Wind: ${windspeed}km/h`;
  let listClouds = document.querySelector("#clouds");
  listClouds.innerHTML = `Cloudiness: ${clouds}%`;
}
// shows temperature in fahrenheit in h2 result container
function setFahrenheit() {
  let h2 = document.querySelector("h2");
  let fahrenheit = Math.round(celsius * 1.8 + 32);
  h2.innerHTML = `${fahrenheit}°F`;
  let listFeel = document.querySelector("#feel");
  let listFahrenheit = Math.round(feelsLike * 1.8 + 32);
  listFeel.innerHTML = `Feels like: ${listFahrenheit}°F`;
}

// shows and updates time per second in result container
function updateTime() {
  let now = new Date();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[now.getDay()];
  let daynumber = now.getDate();
  if (daynumber < 10) {
    daynumber = `0${daynumber}`;
  }
  let months = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let dateData = document.querySelector("#date");
  dateData.innerHTML = `${day} ${daynumber}.${month}.${year}`;

  let currentTime = new Date();
  let hour = currentTime.getHours();
  let minute = currentTime.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let second = currentTime.getSeconds();
  if (second < 10) {
    second = `0${second}`;
  }
  let timeData = document.querySelector("#local-time");
  timeData.innerHTML = `${hour}:${minute}:${second}`;
}

// shows city in h1 result container
function locatedCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("input");
  city = cityElement.value;
  loadWeatherData();
}
// location by coords
function showPosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  loadLocationWeatherData();
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

// load default weather data
loadWeatherData();
setCelsius();
updateTime();

// set temperature to celsius on click
let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", setCelsius);

// set temperature to fahrenheit on click
let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", setFahrenheit);

// update time every second
window.setInterval(updateTime, 1000);

// update city on form submit
let search = document.querySelector("form");
search.addEventListener("submit", locatedCity);

// update city by geolocation
let locationButton = document.querySelector("#location");
locationButton.addEventListener("click", getCurrentPosition);

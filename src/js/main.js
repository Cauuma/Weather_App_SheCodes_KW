// weather API
let city = "Zürich";
let celsius = 0;
let feelsLike = 0;
let humidity = `0%`;
let windspeed = 0;
let clouds = 0;
let lat = 0;
let long = 0;
let modus = "C";

let apiKey = "ca867a1ff9a2ba4fcae7d290754eb99e";

function loadWeatherData() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function loadLocationWeatherData() {
  let locationApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric`;
  axios.get(`${locationApiUrl}&appid=${apiKey}`).then(showTemperature);
}
function forecastWeather() {
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,hourly,alerts&units=metric`;
  axios.get(`${forecastApiUrl}&appid=${apiKey}`).then(forecastTemperature);
}

function forecastTemperature(response) {
  console.log(response);

  const elOneTitle = document.querySelector("#one");
  const elOneTemp = document.querySelector("#one + .forecast-day p");
  updateForecastTemperature(elOneTitle, elOneTemp, response.data.daily[1]);

  updateForecastTemperature(
    document.querySelector("#two"),
    document.querySelector("#two + .forecast-day p"),
    response.data.daily[2]
  );
  updateForecastTemperature(
    document.querySelector("#three"),
    document.querySelector("#three + .forecast-day p"),
    response.data.daily[3]
  );
  updateForecastTemperature(
    document.querySelector("#four"),
    document.querySelector("#four + .forecast-day p"),
    response.data.daily[4]
  );
  updateForecastTemperature(
    document.querySelector("#five"),
    document.querySelector("#five + .forecast-day p"),
    response.data.daily[5]
  );
  updateForecastTemperature(
    document.querySelector("#six"),
    document.querySelector("#six + .forecast-day p"),
    response.data.daily[6]
  );
}

function updateForecastTemperature(elTitle, elTemp, data) {
  let unixTimestamp = data.dt;
  const dateObject = new Date(unixTimestamp * 1000);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[dateObject.getDay()];

  elTitle.innerHTML = `${day}`;
  let temperatureMin = Math.round(data.temp.min);
  let temperatureMax = Math.round(data.temp.max);
  if (modus === "F") {
    temperatureMin = getFahrenheit(temperatureMin);
    temperatureMax = getFahrenheit(temperatureMax);
  }

  elTemp.innerHTML = `${temperatureMin}°${modus} | ${temperatureMax}°${modus}`;
}

function getFahrenheit(temp) {
  return Math.round(temp * 1.8 + 32);
}

// shows of temperature and percent data in result container
function showTemperature(response) {
  console.log(response);
  celsius = Math.round(response.data.main.temp);
  feelsLike = Math.round(response.data.main.feels_like);
  humidity = response.data.main.humidity;
  windspeed = Math.round(response.data.wind.speed);
  clouds = response.data.clouds.all;
  city = response.data.name;
  lat = response.data.coord.lat;
  long = response.data.coord.lon;
  // Icon Data
  let iconData = response.data.weather[0].icon;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${iconData}@2x.png`);
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${description}`;

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;

  forecastWeather();
  setCelsius();
}

function getMiles(speed) {
  return Math.round(speed * 0.621371);
}

// shows temperature in celsius in h2 result container
function setCelsius() {
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${celsius}°C`;
  modus = "C";
  forecastWeather();
  percentData();
}
// shows percent data
function percentData() {
  let listFeel = document.querySelector("#feel");
  listFeel.innerHTML = `Feels like: ${feelsLike} °C`;
  let listHumidity = document.querySelector("#humidity");
  listHumidity.innerHTML = `Humidity: ${humidity} %`;
  let listWindspeed = document.querySelector("#windspeed");
  listWindspeed.innerHTML = `Wind: ${windspeed} km/h`;
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

  let windspeedInMiles = getMiles(windspeed);
  let windspeedElement = document.querySelector("#windspeed");
  windspeedElement.innerHTML = `Wind: ${windspeedInMiles} mph`;

  modus = "F";
  forecastWeather();
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

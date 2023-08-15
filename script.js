let today = new Date();

let dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currDay = dayNames[today.getDay()];
let currTime = today.getHours();
if (currTime < 10) {
  currTime = `0${currTime}`;
}
let currMinutes = today.getMinutes();
if (currMinutes < 10) {
  currMinutes = `0${currMinutes}`;
}

let currDate = document.querySelector("#curr-date");
currDate.innerHTML = `${currDay} ${currTime}:${currMinutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = document.querySelector("#city");
  city.innerHTML = searchInput.value;

  let key = `9944890285fb78d9dd8431cff1b9ec76`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${key}&units=metric`;

  function searchTemperature(response) {
    console.log(response);
    let temperature = Math.round(response.data.main.temp);
    let tempAssign = document.querySelector("#temperature");
    tempAssign.innerHTML = temperature;

    let wind = Math.round(response.data.wind.speed);
    let windAssign = document.querySelector("#wind");
    windAssign.innerHTML = `${wind} m/s`;

    let high = Math.round(response.data.main.temp_max);
    let low = Math.round(response.data.main.temp_min);
    let highLow = document.querySelector("#high-low");
    highLow.innerHTML = `${high}ºC high/ ${low}ºC low`;
    //
    let clouds = response.data.clouds.all;
    let sky = document.querySelector("#clouds");
    if (clouds <= 20) {
      sky.innerHTML = "☀️ sunny";
    } else if (clouds <= 50) {
      sky.innerHTML = "🌤 cloudy";
    } else if (clouds <= 70) {
      sky.innerHTML = "🌥️ cloudy";
    } else if (clouds <= 100) {
      sky.innerHTML = "☁️ cloudy";
    } else if (clouds > 150) {
      sky.innerHTML = "💨 stormy";
    }
  }
  axios.get(url).then(searchTemperature);
}

let form = document.querySelector("#search-form");

form.addEventListener("submit", search);

let key = `9944890285fb78d9dd8431cff1b9ec76`;

function searchGeo() {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;

  let reverseUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${key}`;
  axios.get(reverseUrl).then(showCity);
}

function showCity(response) {
  let city = response.data[0].name;
  let currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(currentUrl).then(showCityTemperature);

  function showCityTemperature(response) {
    let locationTemperature = Math.round(response.data.main.temp);
    let temp = document.querySelector("#temperature");
    temp.innerHTML = locationTemperature;

    let currentCity = document.querySelector("#city");
    currentCity.innerHTML = city;

    let wind = Math.round(response.data.wind.speed);
    let windAssign = document.querySelector("#wind");
    windAssign.innerHTML = `${wind} m/s`;
    //
    let high = Math.round(response.data.main.temp_max);
    let low = Math.round(response.data.main.temp_min);
    let highLow = document.querySelector("#high-low");
    highLow.innerHTML = `${high}ºC high/ ${low}ºC low`;
    //
    let clouds = response.data.clouds.all;
    let sky = document.querySelector("#clouds");
    if (clouds <= 20) {
      sky.innerHTML = "☀️ sunny";
    } else if (clouds <= 50) {
      sky.innerHTML = "🌤 cloudy";
    } else if (clouds <= 70) {
      sky.innerHTML = "🌥️ cloudy";
    } else if (clouds <= 100) {
      sky.innerHTML = "☁️ cloudy";
    } else if (clouds > 150) {
      sky.innerHTML = "💨 stormy";
    }
  }
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", searchGeo);

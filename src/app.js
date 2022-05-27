//Weather API start

function getForecast(coordinates) {
  let apiKey = "ad4802884d586a02c0e38d20a9a32180";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let tempElement = document.querySelector("#tempElement");
  let descriptionElement = document.querySelector("#descriptionElement");
  let cityElement = document.querySelector("#cityElement");
  let humidityElement = document.querySelector("#humidityElement");
  let windElement = document.querySelector("#windElement");
  let iconElement = document.querySelector("#iconElement");

  celsius = response.data.main.temp;

  tempElement.innerHTML = Math.round(celsius);
  descriptionElement.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `src/media/openweathermap/${response.data.weather[0].icon}.svg`
  );

  getForecast(response.data.coord);
}

let weatherApiKey = "ad4802884d586a02c0e38d20a9a32180";
let weatherApiCity = "Copenhagen";
let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weatherApiCity}&appid=${weatherApiKey}&units=metric`;

axios.get(weatherApiUrl).then(displayTemperature);

//Weather API end

//Date and time start

let now = new Date();

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = "0" + minutes;
} else {
  minutes = minutes + "";
}

let year = now.getFullYear();

let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let days = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur"];
let day = days[now.getDay()];

let dayElement = document.querySelector("#dayElement");
let monthElement = document.querySelector("#monthElement");
let dateElement = document.querySelector("#dateElement");
let yearElement = document.querySelector("#yearElement");
let hoursElement = document.querySelector("#hoursElement");
let minutesElement = document.querySelector("#minutesElement");

dayElement.innerHTML = `${day}`;
monthElement.innerHTML = `${month}`;
dateElement.innerHTML = `${date}`;
yearElement.innerHTML = `${year}`;
hoursElement.innerHTML = `${hours}`;
minutesElement.innerHTML = `${minutes}`;

//Date and time end

//Search form start

function search(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityInputElement");
  let chosenCity = cityInputElement.value;
  if (cityInputElement.value.length == 0) {
    alert("You forgot to type a city 👀");
  } else {
    chosenCity = chosenCity.trim().toLowerCase();
    let cityElement = document.querySelector("#cityElement");
    cityElement.innerHTML =
      chosenCity.charAt(0).toUpperCase() + chosenCity.slice(1);
  }
  let weatherApiKey = "ad4802884d586a02c0e38d20a9a32180";
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&appid=${weatherApiKey}&units=metric`;

  axios.get(weatherApiUrl).then(displayTemperature);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", search);

//Search form end

//Geolocation start

function showPosition(position) {
  let apiKey = "ad4802884d586a02c0e38d20a9a32180";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", getCurrentPosition);

//Geolocation end

//Temperature conversion start

let celsius = null;

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#tempElement");
  let fahrenheitTemp = (celsius * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
  celsiusElement.classList.remove("active");
  fahrenheitElement.classList.add("active");
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#tempElement");
  tempElement.innerHTML = Math.round(celsius);
  celsiusElement.classList.add("active");
  fahrenheitElement.classList.remove("active");
}

let fahrenheitElement = document.querySelector("#fahrenheitElement");
fahrenheitElement.addEventListener("click", displayFahrenheitTemp);

let celsiusElement = document.querySelector("#celsiusElement");
celsiusElement.addEventListener("click", displayCelsiusTemp);

//Temperature conversion end

//Weather forecast start

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur"];

  return days[day];
}

function formatHours(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  return hours;
}

function displayForecast(response) {
  let forecastResponseDays = response.data.daily;
  let forecastResponseHours = response.data.hourly;
  let forecastElement = document.querySelector("#forecastElement");

  let forecastHoursHTML = `<div class="col-6">
    <h4>Upcoming hours</h4>`;

  forecastResponseHours.forEach(function (forecastHour, index) {
    if (index > 0 && index < 5) {
      forecastHoursHTML =
        forecastHoursHTML +
        `<ul class="list-group">
            <li class="list-group-item">
              <img src="src/media/openweathermap/${
                forecastHour.weather[0].icon
              }.svg" class="forecast-icon" /> <br />
              <strong>${formatHours(forecastHour.dt)}:00</strong> <br />
              <em>${Math.round(forecastHour.temp)}<sup>°c</sup> with ${
          forecastHour.weather[0].description
        }</em>
            </li>
          </ul>`;
    }
  });

  forecastHoursHTML = forecastHoursHTML + `</div>`;

  let forecastDaysHTML = `<div class="col-6">
  <h4>Upcoming days</h4>`;

  forecastResponseDays.forEach(function (forecastDay, index) {
    if (index > 0 && index < 5) {
      forecastDaysHTML =
        forecastDaysHTML +
        `<ul class="list-group">
            <li class="list-group-item">
              <img src="src/media/openweathermap/${
                forecastDay.weather[0].icon
              }.svg" class="forecast-icon" /> <br />
              <strong>${formatDay(forecastDay.dt)}day</strong> <br />
              <em>Max: ${Math.round(
                forecastDay.temp.max
              )}<sup>°c</sup> Min: ${Math.round(
          forecastDay.temp.min
        )}<sup>°c</sup></em>
            </li>
          </ul>`;
    }
  });

  forecastDaysHTML = forecastDaysHTML + `</div>`;

  forecastElement.innerHTML = forecastHoursHTML + forecastDaysHTML;
}

//Weather forecast end

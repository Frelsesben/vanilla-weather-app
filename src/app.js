//Weather API start

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
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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
  chosenCity = chosenCity.trim().toLowerCase();
  let cityElement = document.querySelector("#cityElement");
  cityElement.innerHTML =
    chosenCity.charAt(0).toUpperCase() + chosenCity.slice(1);
  let weatherApiKey = "ad4802884d586a02c0e38d20a9a32180";
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&appid=${weatherApiKey}&units=metric`;

  axios.get(weatherApiUrl).then(displayTemperature);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", search);

//Search form end

//Geolocation start

function showWeather(response) {
  let tempElement = document.querySelector("#tempElement");
  let descriptionElement = document.querySelector("#descriptionElement");
  let cityElement = document.querySelector("#cityElement");
  let iconElement = document.querySelector("#iconElement");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = response.data.name;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function showPosition(position) {
  let apiKey = "ad4802884d586a02c0e38d20a9a32180";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
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
function displayForecastDays() {
  let forecastDaysElement = document.querySelector("#forecastDaysElement");
  forecastDaysElement.innerHTML = ` <h4>Upcoming days</h4>
          <ul class="list-group">
            <li class="list-group-item">
              ☀️ <br />
              13:00 <br />
              11°C
            </li>
            <li class="list-group-item">
              ☀️ <br />
              13:00 <br />
              11°C
            </li>
            <li class="list-group-item">
              ☀️ <br />
              13:00 <br />
              11°C
            </li>
            <li class="list-group-item">
              ☀️ <br />
              13:00 <br />
              11°C
            </li>
          </ul>`;
}

displayForecastDays();
//Weather forecast end

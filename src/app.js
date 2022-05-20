//Weather API start

function displayTemperature(response) {
  let h1 = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let city = response.data.name;
  h1.innerHTML = `It is ${temperature}<sup>°C</sup> with ${description} in ${city} right now`;
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

let h2 = document.querySelector("h2");
h2.innerHTML = `(${day}day, ${month} ${date}, ${year} at ${hours}:${minutes})`;

//Date and time end

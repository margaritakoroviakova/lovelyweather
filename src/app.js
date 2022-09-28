let now = new Date();
let date = now.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
let currentTime = document.querySelector("#timing");
currentTime.innerHTML = `${hour} : ${minute}`;
let currentDate = document.querySelector("h2");
currentDate.innerHTML = `${day}, ${date}`;


function formatDay (timestamp) {
  let greatDate = new Date(timestamp*1000);
  let day = greatDate.getDay();
  let days = ["Sun", "Mon", "Tue","Wed","Thu","Fri","Sat"];

  return days[day];
}


function mainForecast(response) {
  let displayForecast = response.data.daily;
  let forecastEl = document.querySelector("#forecast");
  let forecastStructure = `<div class="row">`;
  displayForecast.forEach(function (forecastDay, index) {
    if (index < 6)  {
      forecastStructure = forecastStructure + `
      <div class="col-4">
        <div class="day">${formatDay(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"/>
        <div class="degrees">
        <span class="degree">${Math.round(forecastDay.temp.max)}° /</span>
        <span class="degree">${Math.round(forecastDay.temp.min)}°</span>
        </div>
        </div>
`;
    }
  });
  forecastStructure = forecastStructure + `</div>`;
  forecastEl.innerHTML = forecastStructure;
}

function forecast (coordinates) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(mainForecast);
}

function search(event) {
  event.preventDefault();
  let cities = document.querySelector("h3");
  let city = document.querySelector("#city");
  cities.innerHTML = `${city.value}`;
}
let cityForm = document.querySelector("#searching-form");
cityForm.addEventListener("submit", search);

function show(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#feeling").innerHTML = `Feels like: ${Math.round(response.data.main.feels_like)} °C`;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
   if (response.data.sys.country === 'RU') {
    document.querySelector("#sun").innerHTML =  null ;
    document.querySelector("#sun").innerHTML =  "OOOps, something went wrong...";
  }
  document.querySelector("#wind").innerHTML = `wind speed: ${Math.round(response.data.wind.speed)}`;
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  forecast(response.data.coord);
}

function links(city) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(show);
}

function searching(event) {
  event.preventDefault();
  let cityyy = document.querySelector("#city").value;
  links(cityyy);
}

function getLocation(position) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(show);
}

let searchForm = document.querySelector("#searching-form");
searchForm.addEventListener("submit", searching);

links("Kyiv");



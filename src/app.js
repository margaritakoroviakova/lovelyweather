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
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = `wind speed: ${Math.round(response.data.wind.speed)}`;
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  console.log(response.data);
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



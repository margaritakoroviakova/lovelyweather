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
  console.log(response.data);
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



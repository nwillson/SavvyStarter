import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = new Navigo("/");

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
      ${Header(store.Header)}
      ${Nav(store.Links)}
      ${Main(state)}
      ${Footer(store.Home)}
    `;

  afterRender(state);

  router.updatePageLinks();
}

function afterRender(state) {
  /*
  below are eventlisteners that work, but
  I would like an alternative to the alert box that does not make you click "OK"


  document
    .querySelector(".publicParks")
    .addEventListener("mouseover", function() {
      alert("Take that Dog for a stroll!");
    });
  document
    .querySelector(".gatedDogParks")
    .addEventListener("mouseover", function() {
      alert("Let them have some fun!");
    });
  document
    .querySelector(".restaurantsBars")
    .addEventListener("mouseover", function() {
      alert("Does your dog get a drink, too?");
    });
  document.querySelector(".coffee").addEventListener("mouseover", function() {
    alert("Feed that addiction!");
  });
*/
  //below is a new set of event listeners intended to change the color of the buttons on the click
  //Public Parks works in an unintended way, but the rest do not work at all.
  /*
  const button = document.querySelector(
    ".publicParks",
    ".gatedDogParks",
    ".restaurantsBars",
    ".coffee"
  );

  button.addEventListener("click", function onClick() {
    button.style.backgroundColor = "salmon";
  });
*/
}

//SEARCH BAR IMPLEMENTATION BELOW
function getWeatherData() {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&q=st%20louis`
  );
}
function getLocationData() {
  return axios.get(`https://pup-stl.herokuapp.com/locations`);
}
router.hooks({
  before: (done, params) => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";
    switch (view) {
      case "Home":
        Promise.all([getWeatherData(), getLocationData()]).then(response => {
          // Weather Response
          console.log(response);
          const kelvinToFahrenheit = kelvinTemp =>
            Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);
          const weatherResponse = response[0];
          const locationResponse = response[1];
          store.Header.weather = {};
          store.Header.weather.city = weatherResponse.data.name;
          store.Header.weather.temp = kelvinToFahrenheit(
            weatherResponse.data.main.temp
          );
          store.Header.weather.feelsLike = kelvinToFahrenheit(
            weatherResponse.data.main.feels_like
          );
          store.Header.weather.description =
            weatherResponse.data.weather[0].main;

          console.log(weatherResponse.data);

          // Location Response
          store.Home.locations = locationResponse.data;
          console.log(store.Home.locations);
          done();
        });

        break;
      default:
        done();
    }
  },
  already: params => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";

    render(store[view]);
  }
});

router
  .on({
    "/": () => render(),
    ":view": params => {
      let view = capitalize(params.data.view);
      render(store[view]);
    }
  })
  .resolve();
/*
const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");

let users = [];

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  users.forEach(user => {
    const isVisible =
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value);
    user.element.classList.toggle("hide", !isVisible);
  });
});

fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(data => {
    users = data.map(user => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      header.textContent = user.name;
      body.textContent = user.email;
      userCardContainer.append(card);
      return { name: user.name, email: user.email, element: card };
    });
  });
  */

/*
            const userCardTemplate = document.querySelector(
              "[data-user-template]"
            );
            const userCardContainer = document.querySelector(
              "[data-user-cards-container]"
            );
            const searchInput = document.querySelector("[data-search]");

            let users = [];

            searchInput.addEventListener("input", e => {
              const value = e.target.value.toLowerCase();
              users.forEach(user => {
                const isVisible =
                  user.name.toLowerCase().includes(value) ||
                  user.email.toLowerCase().includes(value);
                user.element.classList.toggle("hide", !isVisible);
              });
            });

            response.data.map(user => {
              const card = userCardTemplate.content.cloneNode(true).children[0];
              const header = card.querySelector("[data-header]");
              const body = card.querySelector("[data-body]");
              header.textContent = user.name;
              body.textContent = "Safety Rating: " + user.safetyRating;
              userCardContainer.append(card);
              return {
                name: user.name,
                safetyRating: user.safetyRating,
                element: card
              };
            });
            */

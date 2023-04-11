import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function Input({ getResponse }) {
  const [input, setInput] = useState("");
  const [disable, setDisable] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);

  let errorCity = false;

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  // checkTimeAndDisplayData check time of local storage item if it is > 1 hour then remove from local storage and again make api and store in localstorage. It also remove item from local storage for invalid country
  const checkTimeAndDisplayData = async (cityName, displayLocalObject) => {
    const now = Date.now();

    if (now - displayLocalObject.time > 3600000) {
      localStorage.removeItem(cityName);

      // fetch data again and set it in local storage
      const obj = await getWeatherInfo(cityName);

      localStorage.setItem(cityName, JSON.stringify(obj));
      if (errorCity) {
        localStorage.removeItem(cityName);
      }
    } else {
      getResponse(displayLocalObject);
    }
  };

  // Get Weather Info function which fetch api and display data
  const getWeatherInfo = async (city) => {
    try {
      setDisable(true);

      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
      );

      // hasError(!data.ok);
      const response = await data.json();

      // destructure response and build a new object with that response
      const obj = doDestructuring(response);

      getResponse(obj);
      return obj;
    } catch (error) {
      errorCity = true;
      setDisable(false);
      getResponse(null);
      toast.error("Location not found! Try again ☹");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setFormIsValid(true);
    const cityName = input.trim().toLowerCase();
    if (cityName !== "") {
      if (localStorage.getItem(cityName)) {
        const displayLocalObject = JSON.parse(localStorage.getItem(cityName));

        // check local storage item time then display data
        checkTimeAndDisplayData(cityName, displayLocalObject);
      } else {
        const obj = await getWeatherInfo(cityName);
        if (!errorCity) {
          localStorage.setItem(cityName, JSON.stringify(obj));
        }
        errorCity = false;
      }
      // Clear out input field after fetch is complete
      setInput("");
    }
    setFormIsValid(false);
  };

  const checkFormValidation = () => {
    if (input.length > 0 && input.trim() !== "") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  useEffect(() => {
    checkFormValidation();
  }, [input, disable]);

  return (
    <div className="input-div">
      <div className="weather-heading wavy">
        <h1>Weather Today</h1>
      </div>
      <div className="weather-input">
        <form onSubmit={submitHandler} id="form" autoComplete="off">
          <label className="city" htmlFor="city">
            City
          </label>
          <input
            onChange={inputHandler}
            type="text"
            name="city"
            id="city"
            placeholder="e.g.Ahmedabad"
            autoFocus
            value={input}
          />
          <div className="input-city-desc">
            Enter your city name to get weather info
          </div>
          <button
            className={
              "getInfo " +
              (disable ? "not-allowed " : " ") +
              (formIsValid ? " box-btn" : "")
            }
            type="submit"
            disabled={disable}
          >
            Get Info
          </button>
        </form>
      </div>
    </div>
  );
}

// Destructure response object and build a new object
const doDestructuring = (response) => {
  // Destructuring Response Object
  const {
    name,
    visibility,
    sys: { country },
    weather,
    main: { temp, pressure, humidity },
    wind: { speed, deg },
    dt,
    timezone,
  } = response;

  // main as weatherMain and destructure weather[0] again
  const { main: weatherMain, description } = weather[0];

  const currentNowTime = Date.now();

  // create object and pass to generateView method
  return {
    name: name,
    visibility: visibility,
    country: country,
    weather: weather,
    temp: temp,
    pressure: pressure,
    humidity: humidity,
    speed: speed,
    deg: deg,
    dt: dt,
    timezone: timezone,
    weatherMain: weatherMain,
    description: description,
    time: currentNowTime,
  };
};

export default Input;

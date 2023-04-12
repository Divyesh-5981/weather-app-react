import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { doDestructuring } from "../Helper";

function Input({ getResponse }) {
  const [input, setInput] = useState("");
  const [disable, setDisable] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);

  let errorCity = false;

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  // Get Weather Info function which fetch api and display data
  const getWeatherInfo = async (city) => {
    try {
      setDisable(true);

      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
      );

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
      if (
        localStorage.getItem(cityName) &&
        Date.now() - JSON.parse(localStorage.getItem(cityName)).time < 3600000
      ) {
        getResponse(JSON.parse(localStorage.getItem(cityName)));
      } else {
        if (localStorage.getItem(cityName)) localStorage.removeItem(cityName);

        const obj = await getWeatherInfo(cityName);

        if (!errorCity) {
          localStorage.setItem(cityName, JSON.stringify(obj));
        }
      }
      // Clear out input field after fetch is complete
      setInput("");
    }
    setFormIsValid(false);
  };

  useEffect(() => {
    if (input.trim() !== "") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [input]);

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
            className={`getInfo ${disable ? "not-allowed " : " "} ${
              formIsValid ? " box-btn" : ""
            }`}
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

export default Input;

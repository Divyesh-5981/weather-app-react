import React, { useState, useEffect } from "react";
import moment from "moment";
import { getCurrentDate, generateWeatherIcon } from "../Helper";

function WeatherLeftInfo({ response }) {
  const [currTime, setCurrTime] = useState();

  // realtime clock
  function timeZone(timezone) {
    const timezoneInMinutes = timezone / 60;
    const currentTime = moment()
      .utcOffset(timezoneInMinutes)
      .format("h:mm:ss A");
    setCurrTime(currentTime);
  }

  useEffect(() => {
    const intervalId = setInterval(() => timeZone(response.timezone), 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currTime]);

  return (
    <div className="current-weather-div">
      <div className="name-info">
        <h2 className="country-name">
          {response.name}
          {response.country ? "," + response.country : ""}
        </h2>
      </div>
      <div className="current-weather-info">
        <div className="current-weather-imginfo">
          <img
            alt="current weather image"
            src={generateWeatherIcon(
              response.description,
              response.weatherMain
            )}
          />
          <h2 className="overcast">{response.weatherMain}</h2>
        </div>
        <div className="current-weather-degreeinfo">
          <h1 className="degree">{(response.temp - 273.15).toFixed(2)}°C</h1>
        </div>
      </div>
      <div className="time-info">
        <h2>{getCurrentDate(response.dt, response.timezone)}</h2>
        <h2 className="time">{currTime}</h2>
      </div>
    </div>
  );
}

export default WeatherLeftInfo;

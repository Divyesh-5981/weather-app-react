import React from "react";

function WeatherLeftInfo({ response }) {
  // getCurrentDate function to display current date of specific country
  function getCurrentDate(dt, timezone) {
    const inputDate = new Date(dt * 1000 + timezone * 1000)
      .toISOString()
      .slice(0, 10); // 2020-06-14

    const date = new Date(inputDate);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    const formatedSplitDate = formattedDate.split(" "); //June 14, 2020

    const newDate = formatedSplitDate[1].replace(",", "");
    const month = formatedSplitDate[0];
    const year = formatedSplitDate[2];

    return newDate + " " + month + " " + year; //14 June 2020
  }

  // generate weather icon based on the weatherDescription and weatherMain property. function returns src
  function generateWeatherIcon(weatherDes, weatherMain) {
    if (
      weatherMain === "Rain" ||
      weatherDes === "light rain" ||
      weatherDes === "moderate rain" ||
      weatherDes === "heavy intensity rain" ||
      weatherDes === "very heavy rain" ||
      weatherDes === "extreme rain"
    ) {
      return "../animated/rain.svg";
    } else if (weatherMain === "Snow" || weatherDes === "freezing rain") {
      return "../animated/snow.svg";
    } else if (
      weatherMain === "Drizzle" ||
      weatherDes === "light intensity shower rain" ||
      weatherDes === "shower rain" ||
      weatherDes === "heavy intensity shower rain" ||
      weatherDes === "ragged shower rain"
    ) {
      return "../animated/shower_rain.svg";
    } else if (weatherMain === "Clouds" || weatherDes === "few clouds") {
      return "../animated/few_clouds.svg";
    } else if (
      weatherDes === "scattered clouds" ||
      weatherDes === "broken clouds" ||
      weatherDes === "overcast clouds"
    ) {
      return "../animated/broken_clouds.svg";
    } else if (weatherMain === "Clear") {
      return `../animated/clear_sky.svg`;
    } else if (weatherMain === "Thunderstorm") {
      return `../animated/thunderstorm.svg`;
    } else if (
      weatherMain === "Mist" ||
      weatherMain === "Smoke" ||
      weatherMain === "Haze" ||
      weatherMain === "Dust" ||
      weatherMain === "Fog" ||
      weatherMain === "Sand" ||
      weatherMain === "Ash" ||
      weatherMain === "Squall" ||
      weatherMain === "Tornado"
    ) {
      return `../animated/mist.svg`;
    } else {
      return;
    }
  }

  return (
    <div className="current-weather-div">
      <div className="name-info">
        <h2 className="country-name">
          {/* ${obj.name}${obj.country ? "," + obj.country : ""}`{response.name} */}
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
          {/* <h1 className="degree">${(obj.temp - 273.15).toFixed(2)}°C</h1> */}
          <h1 className="degree">{(response.temp - 273.15).toFixed(2)}°C</h1>
        </div>
      </div>
      <div className="time-info">
        {/* <h2>{getCurrentDate(response.dt, response.timezone)}</h2> */}
        <h2>14 June 2020</h2>
        <h2 className="time"></h2>
      </div>
    </div>
  );
}

export default WeatherLeftInfo;

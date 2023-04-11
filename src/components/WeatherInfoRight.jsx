import React from "react";

function WeatherInfoRight({ response }) {
  // destructure response
  const { pressure, visibility, speed, deg, humidity } = response;

  return (
    <div className="more-info-div">
      <div className="more-info-heading">
        <h2>More Info</h2>
      </div>
      <div className="info-div">
        <div className="single-info">
          <p className="more-info-p">Pressure: {pressure}</p>
          <svg
            style={{ fontSize: "20px" }}
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8Zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0Zm-.5 11.707l-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0v-3.793Z"
            />
          </svg>
        </div>
        <div className="single-info">
          <p className="more-info-p">Visibility: {visibility}</p>
          <i className="far fa-binoculars"></i>
        </div>
        <div className="single-info">
          <p className="more-info-p">Wind Speed: {speed}</p>
          <i className="far fa-wind"></i>
        </div>
        <div className="single-info">
          <p className="more-info-p">Wind Degree: {deg}</p>
          <i className="far fa-location-arrow"></i>
        </div>
        <div className="single-info">
          <p className="more-info-p">Humidity: {humidity}</p>
          <i className="far fa-tint"></i>
        </div>
      </div>
    </div>
  );
}
export default WeatherInfoRight;

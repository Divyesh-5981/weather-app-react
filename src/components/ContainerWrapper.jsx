import React from "react";
import WeatherLeftInfo from "./WeatherInfoLeft";
import WeatherInfoRight from "./WeatherInfoRight";

function ContainerWrapper({ response }) {
  return (
    <div>
      <section className="sectionContainer">
        <WeatherLeftInfo response={response} />
        {/* <WeatherInfoRight response={response} /> */}
      </section>
    </div>
  );
}

export default ContainerWrapper;

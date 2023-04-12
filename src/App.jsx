import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import Input from "./components/Input";
import WeatherLeftInfo from "./components/WeatherInfoLeft";
import WeatherInfoRight from "./components/WeatherInfoRight";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [response, setResponse] = useState(null);

  return (
    <div className="container">
      <Input getResponse={setResponse} />
      {response && (
        <div>
          <section className="sectionContainer">
            <WeatherLeftInfo response={response} />
            <WeatherInfoRight response={response} />
          </section>
        </div>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;

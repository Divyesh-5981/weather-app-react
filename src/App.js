import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import ContainerWrapper from './components/ContainerWrapper';
import Input from './components/Input';
import './App.css';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [response, setResponse] = useState(null);

  return (
    <div className="container">
      <Input getResponse={setResponse} />
      {response && <ContainerWrapper response={response} />}
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </div >
  );
}

export default App;

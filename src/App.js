import React from 'react';
import './App.css';
import Card from './components/Card';
import ContainerWrapper from './components/ContainerWrapper';
import Input from './components/Input';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [response, setResponse] = React.useState(null);

  return (
    <Card>
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
    </Card >
  );
}

export default App;

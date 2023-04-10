import React from 'react';
import './App.css';
import Card from './components/Card';
import ContainerWrapper from './components/ContainerWrapper';
import Input from './components/Input';

function App() {
  const [response, setResponse] = React.useState(null);

  const getResponse = (response) => {
    setResponse(response)
  }

  return (
    <Card>
      <Input getResponse={getResponse} />
      {response && <ContainerWrapper response={response} />}
    </Card >
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

function App() {

  const [stateCar, setStateCar] = useState(false);
  const [contar, setContar] = useState(0);
  
  const btnState = ((stateCar) ? "Apagar coche" : "Encender coche");
  
  const encenderApagar = _=> {
    setStateCar(!stateCar);
    setContar(contar + 1);
  }

  
  useEffect(() => {
    console.log(`Total: ${contar}`);
  }, [contar])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>El coche está: {stateCar ? "Encendido" : "Apagado"}</h1>
        <h4>Clicks: {contar}</h4>
        <button onClick={encenderApagar}> {btnState} </button>
      </header>
    </div>
  );
}

export default App;

import React, {useState} from 'react';
import CurrentWeather from './components/CurrentWeather';

function App() {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');

  console.info(setUnit, unit);
  return (
    <>
      <h1>Pollard Farm Weather</h1>
      <CurrentWeather 
        unit='imperial'
      />
    </>
  );
};

export default App;

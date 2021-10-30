import React, {useState, useEffect} from 'react';
import CurrentWeather from './components/CurrentWeather';
import Header from './components/Header';

function App() {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [weather, setWeather] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const getCurrentWeather = () => {
    const key = process.env.API_KEY;
    const station = 'ICHATH53';
    fetch(`https://api.weather.com/v2/pws/observations/current?stationId=${station}&format=json&units=e&apiKey=${key}&numericPrecision=decimal`)
      .then(response => response.json())
      .then(data => {
        setWeather(data.observations[0]);
      })
      .catch((error) => {
        console.error(error);
      }
    );
  }
  useEffect(() => {
    getCurrentWeather();
    setLoading(false)
  }, []);

  if (loading || !weather) {
    return (
      <div className='wrapper'>
        <Header
        />
        <CurrentWeather 
        />
      </div>
    );
  };

  console.log(weather)
  console.info('quieting ts erros', setUnit, unit);
  return (
    <div className='wrapper'>
      <Header
        station={weather.stationID}
        time={weather.epoch}
      />
      <CurrentWeather 
        weather={weather}
      />
    </div>
  );
};

export default App;

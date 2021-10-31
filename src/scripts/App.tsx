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
          unit={unit}
        />
      </div>
    );
  };

  const time = new Date(weather.epoch * 1000)
  const timeHours = time.getHours();

  console.log(timeHours, weather)
  console.debug('quieting ts erros', setUnit);
  return (
    <div className='wrapper'>
      <Header
        station={weather.stationID}
        time={time}
      />
      <CurrentWeather 
        time={time}
        unit={unit}
        weather={weather}
      />
    </div>
  );
};

export default App;

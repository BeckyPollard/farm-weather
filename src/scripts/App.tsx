import React, {useState, useEffect} from 'react';
import CurrentWeather from './components/CurrentWeather';
import Header from './components/Header';

function App() {
  const [weather, setWeather] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<string>('theme-day-clear');

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
  console.log('🌦 Weather API from Wunderground:', weather);

  if (loading || !weather) {
    return (
      <div className={`theme ${theme}`}>
        <div className='wrapper'>
          <Header/>
          <CurrentWeather/>
        </div>
      </div>
    );
  };

  const time = new Date(weather.epoch * 1000);

  console.log(setTheme);

  return (
    <div className={`theme ${theme}`}>
      <div className='wrapper'>
        <Header
          station={weather.stationID}
          time={time}
        />
        <CurrentWeather 
          time={time}
          weather={weather}
        />
      </div>
    </div>
  );
};

export default App;

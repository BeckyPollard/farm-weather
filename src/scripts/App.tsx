import React, {useState, useEffect} from 'react';
import SunCalc from 'suncalc';
import CurrentWeather from './components/CurrentWeather';
import Header from './components/Header';

function App() {
  const [weather, setWeather] = useState<any>();
  const [weatherTime, setWeatherTime] = useState<Date>();
  const [loading, setLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<string>('theme-day-clear');
  // const [daytime, setDaytime] = useState<boolean>(true);

  const getCurrentWeather = () => {
    const key = process.env.API_KEY;
    const station = 'ICHATH53';
    fetch(`https://api.weather.com/v2/pws/observations/current?stationId=${station}&format=json&units=e&apiKey=${key}&numericPrecision=decimal`)
      .then(response => response.json())
      .then(data => {
        setWeather(data.observations[0]);
        setWeatherTime(new Date(data.observations[0].epoch * 1000))
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
        <Header/>
        <CurrentWeather/>
      </div>
    );
  };
  console.log('🌦 Weather API from Wunderground:', weather);

  
  const setSun = (time: Date) => {
    const sun = SunCalc.getTimes(time, weather.lat, weather.lon)
    console.log('sunset = ', sun.sunset);
    console.log('sunrise = ', sun.sunrise);
    console.log('current time = ', time);
  }



  console.info('shuttup typescript', setTheme, theme, setSun); //quiet typescript

  return (
    <div className='wrapper'>
      <Header
        station={weather.stationID}
        time={weatherTime}
      />
      <CurrentWeather 
        time={weatherTime}
        weather={weather}
      />
    </div>
  );
};

export default App;

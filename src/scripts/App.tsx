import React, {useState, useEffect} from 'react';
import SunCalc from 'suncalc';
import CurrentWeather from './components/CurrentWeather';
import Header from './components/Header';
import { DateTime } from 'luxon';

export function useTheme(weather: any) {
  useEffect(
    () => {
      if (!weather) return; // this feels dirty?

      const date = new Date(weather.obsTimeLocal);
      const isCloudy = weather.uv === 0; // will have to test this theory
      const sun = SunCalc.getTimes(date, weather.lat, weather.lon);

      const todayNow = DateTime.fromISO(date.toISOString()).toFormat('X');
      const todayStart = DateTime.fromISO(date.toISOString()).startOf('day').toFormat('X');
      const todaySunrise = DateTime.fromISO(sun.sunrise.toISOString()).toFormat('X');
      const todaySunset = DateTime.fromISO(sun.sunset.toISOString()).toFormat('X');
      const todayEnd = DateTime.fromISO(date.toISOString()).endOf('day').toFormat('X');

      const addBodyClass = (className: string) => document.body.classList.add(className);

      if (todayNow >= todayStart && todayNow < todaySunrise) {
        addBodyClass('theme-night');
      }
      if (todayNow >= todaySunrise && todayNow < todaySunset) {
        if (isCloudy) {
          addBodyClass('theme-day-cloudy');
        } else {
          addBodyClass('theme-day-clear');
        }
      }
      if (todayNow >= todaySunset && todayNow < todayEnd) {
        addBodyClass('theme-night');
      }
    }, [weather]
  );
}

function App() {
  const [weather, setWeather] = useState<any>(); // i should make a type for this
  const [weatherTime, setWeatherTime] = useState<Date>();
  const [loading, setLoading] = useState<boolean>(true);

  const getCurrentWeather = () => {
    const key = process.env.API_KEY;
    const station = 'ICHATH53';
    fetch(`https://api.weather.com/v2/pws/observations/current?stationId=${station}&format=json&units=e&apiKey=${key}&numericPrecision=decimal`)
      .then(response => response.json())
      .then(data => {
        setWeather(data.observations[0]);
        setWeatherTime(new Date(data.observations[0].epoch * 1000));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      }
      );
  };

  useEffect(() => {
    getCurrentWeather();
    setLoading(false);
  }, []);

  useTheme(weather);

  if (loading || !weather) {
    return (
      <div className='wrapper'>
        <Header/>
        <CurrentWeather/>
      </div>
    );
  }

  // eslint-disable-next-line no-console
  console.log('🌦 Weather API from Wunderground:', weather); //to show dad how the data looks

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
}

export default App;

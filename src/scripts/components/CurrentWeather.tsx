import React from 'react';
import { Weather } from '../../types';

type CurrentWeatherProps = {
  weather?: Weather,
};
export default function CurrentWeather(props: CurrentWeatherProps) {
  return (
    <>
      <div className="weather-report">
        <WeatherItem
          temp={props.weather?.imperial.temp}
          tempWind={props.weather?.imperial.windChill}
        />
        <WeatherItem
          temp={props.weather?.imperial.temp}
        />
        <WeatherItem
          temp={props.weather?.imperial.temp}
        />
        <WeatherItem
          temp={props.weather?.imperial.temp}
        />

      </div>
    </>
  );
};

type WeatherItem = {
  temp?: number,
  tempWind?: number,
};
const WeatherItem = (props: WeatherItem) => {
  return (
    <div className="item">
      <span aria-hidden='true' className="material-icons-outlined">
        thermostat
      </span>
      <p>{props.temp ? `${props.temp}°F` : 'Loading...'}</p>
      <p>{props.tempWind ? `Feels like ${props.tempWind}°F` : ''}</p>
    </div>
  );
};

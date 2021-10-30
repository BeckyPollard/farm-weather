import React from 'react';
import { Weather } from '../../types';

type CurrentWeatherProps = {
  weather?: Weather,
}
export default function CurrentWeather(props: CurrentWeatherProps) {
  return (
    <>
      <div className="weather-report">
        <div className="item">
          <p>{props.weather ? `${props.weather?.imperial.temp} F` : 'Loading...'}</p>
        </div>
        <div className="item">
          <p>{props.weather?.imperial.temp} F</p>
        </div>
        <div className="item">
          <p>{props.weather?.imperial.temp} F</p>
        </div>
        <div className="item">
          <p>{props.weather?.imperial.temp} F</p>
        </div>
      </div>
    </>
  );
};

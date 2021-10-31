import React from 'react';
import { Weather } from '../../types';

type CurrentWeatherProps = {
  weather?: Weather,
};
export default function CurrentWeather(props: CurrentWeatherProps) {

  if (!props.weather) {
    return (
      <div className="weather-report">
        <WeatherItemLoading
          icon='thermostat'
          subject='Loading...'
        />
        <WeatherItemLoading
          icon='water_drop'
          subject='Loading...'
        />
        <WeatherItemLoading
          icon='water_drop'
          subject='Loading...'
        />
        <WeatherItemLoading
          icon='air'
          subject='Loading...'
        />
      </div>
    );
  };

  let tempFeel;
  if (props.weather.imperial.temp >= 70) {
    tempFeel = props.weather.imperial.heatIndex;
  } else if (props.weather.imperial.temp <= 61) {
    tempFeel = props.weather.imperial.windChill;
  } else {
    tempFeel = props.weather.imperial.temp;
  };

  return (
    <div className="weather-report">
      <WeatherItem
        icon='thermostat'
        subject='Temperature'
        temp={props.weather.imperial.temp || '0'}
        tempFeel={tempFeel}
      />
      <WeatherItem
        subject='Rain Gage'
        icon='water_drop'
        rain={props.weather.imperial.precipTotal || '0'}
        rainRate={props.weather.imperial.percipRate || '0'}
      />
      <WeatherItem
        subject='Humidity'
        icon='water_drop'
        humidity={props.weather?.humidity}
      />
      <WeatherItem
        subject='Wind'
        icon='air'
        windGust={props.weather?.imperial.windGust}
        windSpeed={props.weather?.imperial.windSpeed}
      />
    </div>
  );
};

type WeatherItemLoadingProps = {
  icon: string,
  subject: string,
};
const WeatherItemLoading = (props: WeatherItemLoadingProps) => {
  return (
    <div className="item">
      <h2>{props.subject}</h2>
      <span aria-hidden='true' className="material-icons-outlined">
        {props.icon}
      </span>
      <p>0</p>
    </div>
  );
};

type WeatherItemProps = {
  humidity?: number,
  icon: string,
  rain?: number | string,
  rainRate?: number | string,
  subject: string,
  temp?: number | string,
  tempFeel?: number | string,
  windGust?: number,
  windSpeed?: number,
};
const WeatherItem = (props: WeatherItemProps) => {
  return (
    <div className="item">
      <h2>{props.subject}</h2>
      <span aria-hidden='true' className="material-icons-outlined">
        {props.icon}
      </span>

      {(props.temp && props.tempFeel)
        ? <>
            <p>{`${props.temp}°F`}</p>
            <p>{`Feels like ${props.tempFeel}°F`}</p>
          </>
        : null
      }

      {(props.rain && props.rainRate)
        ? <>
            <p>{`${props.rain} in`}</p>
            <p>{`${props.rainRate} in/hr`}</p>
          </>
        : null
      }

      {props.humidity
        ? <p>{`${props.humidity}%`}</p>
        : null
      }

      {(props.windGust && props.windSpeed)
        ? <>
            <p>{`${props.windSpeed} mph`}</p>
            <p>{`with ${props.windGust} mph gusts`}</p>
          </>
        : null
      }
      
    </div>
  );
};

import React from 'react';
import { Weather } from '../../types';

const convertToCelsius = (f: string | number) => {
  return (
    ((+f - 32) * .5556).toFixed(1)
  );
};

type CurrentWeatherProps = {
  time?: Date,
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
          icon='air'
          subject='Loading...'
        />
        <WeatherItemLoading
          icon='water_drop'
          subject='Loading...'
        />
        <WeatherItemLoading
          icon='opacity'
          subject='Loading...'
        />
        <WeatherItemLoading
          icon='light_mode'
          subject='Loading...'
        />
        <WeatherItemLoading
          icon='speed'
          subject='Loading...'
        />
        <CreditsItem />
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
        unit='imperial'
      />
      <WeatherItem
        subject='Rain Gage'
        icon='water_drop'
        rain={props.weather.imperial.precipTotal || '0'}
        rainRate={props.weather.imperial.percipRate || '0'}
        unit='imperial'
      />
      <WeatherItem
        subject='Wind'
        icon='air'
        unit='imperial'
        windGust={props.weather.imperial.windGust || '0'}
        windSpeed={props.weather.imperial.windSpeed || '0'}
      />
      <WeatherItem
        subject='Humidity'
        icon='water_drop'
        humidity={props.weather.humidity || '0'}
        unit='imperial'
      />
      <WeatherItem
        subject='Dew Point'
        icon='opacity'
        dewPoint={props.weather.imperial.dewpt || '0'}
        unit='imperial'
      />
      <WeatherItem
        subject='UV Index'
        icon='light_mode'
        unit='imperial'
        uv={props.weather.uv || '0'}
      />
      <WeatherItem
        subject='Air Pressure'
        icon='speed'
        pressure={props.weather.imperial.pressure || '0'}
        unit='imperial'
      />
      <CreditsItem />
    </div>
  );
};

const CreditsItem = () => {
  return (
    <div className="credits">
      <h2>Website Credits</h2>
      <span aria-hidden='true' className="material-icons-outlined">
        live_help
      </span>
      <p>API by <a href={`https://www.wunderground.com/`}>Wunderground</a></p>
      <p>Website by <a href={`https://www.becky.dev/`}>Becky Pollard</a></p>
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
  dewPoint?: number | string,
  humidity?: number | string,
  icon: string,
  pressure?: number | string,
  rain?: number | string,
  rainRate?: number | string,
  subject: string,
  temp?: number | string,
  tempFeel?: number | string,
  unit: 'imperial' | 'metric',
  uv?: number | string,
  windGust?: number | string,
  windSpeed?: number | string,
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
            <p>{`${props.temp}°F / ${convertToCelsius(props.temp)}°C`}</p>
            <p>{`feels like ${props.tempFeel}°F or ${convertToCelsius(props.temp)}°C`}</p>
          </>
        : null
      }

      {(props.rain && props.rainRate)
        ? <>
            <p>{`${props.rain} in`}</p>
            <p>{props.rainRate !== '0' ?? `at a rate of ${props.rainRate} in/hr`}</p>
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
            <p>{props.windSpeed !== '0' ? `with ${props.windGust} mph gusts` : 'No wind'}</p>
          </>
        : null
      }

      {props.pressure
        ? <>
            <p>{`${props.pressure} in`}</p>
          </>
        : null
      }

      {props.uv
        ? <>
            <p>{`${props.uv}`}</p>
          </>
        : null
      }

      {props.dewPoint
        ? <>
            <p>{`${props.dewPoint}°F / ${convertToCelsius(props.dewPoint)}°C`}</p>
          </>
        : null
      }
      
    </div>
  );
};

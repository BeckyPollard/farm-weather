import React from 'react';
import { Weather } from '../../types';

type CurrentWeatherProps = {
  weather?: Weather,
  time?: Date,
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
        humidity={props.weather.humidity}
      />
      <WeatherItem
        subject='Wind'
        icon='air'
        windGust={props.weather.imperial.windGust}
        windSpeed={props.weather.imperial.windSpeed}
      />
      <WeatherItem
        subject='Air Pressure'
        icon='speed'
        pressure={props.weather.imperial.pressure || '0'}
      />
      <WeatherItem
        subject='UV Index'
        icon='light_mode'
        uv={props.weather.uv || '0'}
      />
      <WeatherItem
        subject='Dew Point'
        icon='opacity'
        dewPoint={props.weather.imperial.dewpt || '0'}
      />
      <div className="credits">
        <h2>Website Credits</h2>
        <span aria-hidden='true' className="material-icons-outlined">
          live_help
        </span>
        <p>API by <a href={`https://www.wunderground.com/`}>Wunderground</a></p>
        <p>Website by <a href={`https://www.becky.dev/`}>Becky Pollard</a></p>
      </div>
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
  humidity?: number,
  icon: string,
  pressure?: number | string,
  rain?: number | string,
  rainRate?: number | string,
  subject: string,
  temp?: number | string,
  tempFeel?: number | string,
  // unit: string,
  windGust?: number,
  windSpeed?: number,
  uv?: number | string,
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
            <p>{`feels like ${props.tempFeel}°F`}</p>
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
            <p>{`with ${props.windGust} mph gusts`}</p>
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
            <p>{`${props.dewPoint}°F`}</p>
          </>
        : null
      }
      
    </div>
  );
};

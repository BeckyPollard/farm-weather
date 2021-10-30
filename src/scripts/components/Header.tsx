import React from 'react';
import { DateTime } from 'luxon';

type CurrentWeatherProps = {
  station?: string,
  time?: number,
}
export default function CurrentWeather(props: CurrentWeatherProps) {
  const time = props.time
    ? DateTime.fromISO(new Date(props.time * 1000).toISOString()).toFormat('ccc MMMM dd, yyyy - h:mm a')
    : '';
  console.log(time);
  return (
    <header>
        <h1>Pollard Farm</h1>
        {props.station
          ? <p>Weather Station: <a href={`https://www.wunderground.com/dashboard/pws/${props.station}`}>
              {props.station}
            </a>
          </p>
          : <p>Loading...</p>
        }
        <p>{time}</p>
      </header>
  );
};

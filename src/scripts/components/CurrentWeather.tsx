import React, {useState, useEffect} from 'react';

type CurrentWeatherProps = {
  unit: 'imperial' | 'metric',
}
export default function CurrentWeather(props: CurrentWeatherProps) {
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
      <p>loading...</p>
    );
  };

  console.log(weather)
  return (
    <section className='weather-report'>
      <div>
        <p>{weather.imperial.temp}°F</p>
      </div>
      <div>
        <p>{weather.humidity}% humid</p>
      </div>
      <div>
        <p>{weather.imperial.precipTotal} inches</p>
        <p>{weather.imperial.precipRate} inches per hour</p>
      </div>
    </section>
  );
};

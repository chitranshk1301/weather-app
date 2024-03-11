import React, { useEffect, useState } from 'react';
import Weather from './components/Weather';
import Search from './components/Search';
import Forecast from './components/Forecast';

export default function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      // await fetch(`${process.env.REACT_APP_API_URL}/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}/{date}/{unit}?key={API key}&include=obs      `)
        .then(res => res.json())
        .then(result => {
          setWeatherData(result.current);
          console.log(result);
        });

      await fetch(`${process.env.REACT_APP_API_URL}/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setForecastData(result.list);
          console.log(result);
        });
    }
    fetchData();
  }, [lat, long]);

  const handleSearch = async (city) => {
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`);
    const weatherData = await weatherResponse.json();
    setWeatherData(weatherData);

    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}`);
    const forecastData = await forecastResponse.json();
    setForecastData(forecastData);
  };


  return (
    <div className='App'>
      <Search onSearch={handleSearch} />
      {weatherData && (
        <>
          <Weather weatherData={weatherData} />
          <Forecast forecastData={forecastData} />
        </>
      )}
    </div>
  );
}

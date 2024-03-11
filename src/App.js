import React, { useEffect, useState } from 'react';
import DefaultWeather from './components/DefaultWeather';
import Forecast from './components/Forecast'

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchQuery || !isButtonClicked) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${searchQuery}`);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        setError("Failed to fetch weather data. Please try again.");
      } finally {
        setIsLoading(false);
        setIsButtonClicked(false);
      }
    };

    fetchWeatherData();
  }, [searchQuery, isButtonClicked]);

  const handleButtonClick = () => {
    setIsButtonClicked(true);
  };

  return (
    <div>
      <DefaultWeather />
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleButtonClick}>Fetch Weather</button>
      {isLoading && <p>Loading weather data...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <>
          <h2>{weatherData.location.name}</h2>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind speed - mph: {weatherData.current.wind_mph}m/h</p>
          <p>Wind speed - kmph: {weatherData.current.wind_kph}km/h</p>
          <p>
            Weather description: <img src={weatherData.current.condition.icon} alt="Weather icon" /> - {weatherData.current.condition.text}
          </p>

        </>
      )}

      <Forecast city={searchQuery} />
    </div>
  );
};

export default Weather;

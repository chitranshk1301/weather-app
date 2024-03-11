import React, { useEffect, useState } from 'react';
import DefaultWeather from './components/DefaultWeather';
import Forecast from './components/Forecast';

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
    <div className="container mx-auto mt-8 p-4">
      <DefaultWeather />
      <div className="my-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={handleButtonClick} className="ml-2 bg-blue-500 text-white p-2 rounded">Fetch Weather</button>
      </div>
      {isLoading && <p className="text-lg">Loading weather data...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {weatherData && (
        <div>
          <h2 className="text-2xl font-bold mb-4">{weatherData.location.name}</h2>
          <p className="text-3xl font-bold underline">Temperature: {weatherData.current.temp_c}°C</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind speed - mph: {weatherData.current.wind_mph}m/h</p>
          <p>Wind speed - kmph: {weatherData.current.wind_kph}km/h</p>
          <p className="mt-2">
            Weather description: <img src={weatherData.current.condition.icon} alt="Weather icon" className="inline-block align-middle" /> - {weatherData.current.condition.text}
          </p>
        </div>
      )}

      <Forecast city={searchQuery} />
    </div>
  );
};

export default Weather;

import React, { useEffect, useState } from 'react';

const DefaultWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${latitude},${longitude}`);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        setError("Failed to fetch weather data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    const getLocationAndFetchWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);
          },
          (error) => {
            console.error("Error getting location:", error);
            setError("Error getting location. Please try again.");
            setIsLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by your browser.");
        setIsLoading(false);
      }
    };

    getLocationAndFetchWeather();
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default DefaultWeather;

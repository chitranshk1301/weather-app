import React, { useEffect, useState } from 'react';

const WeatherForecast = ({ city }) => {
  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city}&days=7`);
        const data = await response.json();
        setForecastData(data.forecast);
      } catch (error) {
        console.error("Failed to fetch forecast data:", error);
        setError("Failed to fetch forecast data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchForecastData();
  }, [city]);

  return (
    <div>
      {isLoading && <p>Loading forecast data...</p>}
      {error && <p>{error}</p>}
      {forecastData && (
        <div>
          <h2>7-Day Weather Forecast for {city}</h2>
          {forecastData.forecastday.map((day, index) => (
            <div key={index}>
              <p>Date: {day.date}</p>
              <p>Max Temperature: {day.day.maxtemp_c}°C</p>
              <p>Min Temperature: {day.day.mintemp_c}°C</p>
              <p>Condition: {day.day.condition.text}</p>
              <img src={day.day.condition.icon} alt="Weather icon" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;

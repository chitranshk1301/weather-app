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
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city}&days=7`);
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
    <div className="mt-4 p-4 bg-opacity-25 backdrop-filter backdrop-blur-md rounded-lg text-black bg-white">
      {isLoading && <p className="text-lg">Loading forecast data...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {forecastData && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Weather Forecast for next 7 days in {city}</h2>
          <div className="grid grid-cols-7 gap-4">
            {forecastData.forecastday.map((day, index) => (
              <div key={index} className="bg-white p-2 rounded-md shadow-md bg-opacity-40">
                <p className="font-bold text-sm mb-1">Date: {day.date}</p>
                <p>Max: {day.day.maxtemp_c}°C</p>
                <p>Min: {day.day.mintemp_c}°C</p>
                <p>{day.day.condition.text}</p>
                <img src={day.day.condition.icon} alt="Weather icon" className="mt-1" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;

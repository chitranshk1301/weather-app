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
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${latitude},${longitude}`);
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
    <div className="mt-4 p-2 mx-96 px-20 bg-opacity-25 backdrop-filter backdrop-blur-md rounded-lg w-1/2 text-white bg-white grid grid-cols-2 gap-4">
      {isLoading && <p className="text-lg">Loading weather data...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {weatherData && (
        <>
          <div className='row-span-2'>
            <h2 className="text-2xl font-bold mb-4">
              <img src={weatherData.current.condition.icon} alt="Weather icon" className='inline-block h-[120px] w-[120px]' />
              {weatherData.current.temp_c}°C
            </h2>
            <p className='text-5xl ml-10'>{weatherData.location.name}</p>
            <p className='ml-10 mb-8'>{weatherData.current.condition.text}</p>
          </div>
          <div className='grid grid-row-3 gap-4 mt-10'>
            <p>Humidity: {weatherData.current.humidity}%</p>
            <p>Wind speed - mph: {weatherData.current.wind_mph}m/h</p>
            <p>Wind speed - kmph: {weatherData.current.wind_kph}km/h</p>
          </div>
        </>
      )}
    </div>

  );
};

export default DefaultWeather;

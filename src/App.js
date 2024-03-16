import React, { useEffect, useState } from 'react';
import Loader from './components/Loader/Loader';
import DefaultWeather from './components/DefaultWeather';
import Forecast from './components/Forecast';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState(null); 
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchQuery || !isButtonClicked) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${searchQuery}`);
        const data = await response.json();
        setWeatherData(data);

        // const unsplashResponse = await fetch(`https://api.unsplash.com/photos/random/?page=1&query=${searchQuery}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
        const unsplashResponse = await fetch(`https://api.unsplash.com/photos/random/?page=1&query=${searchQuery}&client_id=muuM3kOFoQW5lmGZYX90324jWHoJ4eMBDpdPiwrMjOg`);
        const unsplashData = await unsplashResponse.json();
        console.log(unsplashData.urls);
        setBackgroundImageUrl(unsplashData.urls.raw);
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

  const gradientStyles = {
    background: 'linear-gradient(135deg, #000000 0%, #282844 100%)',
    minHeight: '100vh',
  };

  return (
    <div
      className="container mx-auto p-4 min-h-screen bg-gradient-to-br from-black to-gray-900"
    >
      <div className="mx-auto flex flex-col">
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
        {/* {isLoading && <p className="text-lg">Loading weather data...</p>} */}
        {isLoading && <Loader />}
        {weatherData && (
          <div
            style={{ backgroundImage: `url(${backgroundImageUrl || ''})`, backgroundSize: 'fill', ...(!backgroundImageUrl && gradientStyles) }}
          >
            <div className='p-4 mt-4 bg-opacity-25 backdrop-filter backdrop-blur-md rounded-lg text-white bg-white'>
              <h2 className="text-2xl font-bold mb-4">{weatherData.location.name}</h2>
              <p>Temperature: {weatherData.current.temp_c}°C</p>
              <p>Humidity: {weatherData.current.humidity}%</p>
              <p>Wind speed - mph: {weatherData.current.wind_mph}m/h</p>
              <p>Wind speed - kmph: {weatherData.current.wind_kph}km/h</p>
              <p className="mt-2">
                Weather description: <img src={weatherData.current.condition.icon} alt="Weather icon" className="inline-block align-middle" /> - {weatherData.current.condition.text}
              </p>
            </div>
          </div>
        )}

        <Forecast city={searchQuery} />
      </div>
    </div>
  );
};

export default Weather;

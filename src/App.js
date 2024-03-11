import React, { useEffect, useState } from 'react';

const Weather = () => {
 const [weatherData, setWeatherData] = useState(null);
 const [searchQuery, setSearchQuery] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState(null);
 const [isButtonClicked, setIsButtonClicked] = useState(false);

 useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchQuery || !isButtonClicked) return; // Check if the button is clicked

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
 }, [searchQuery, isButtonClicked]); // Only run when searchQuery or isButtonClicked changes

 const handleButtonClick = () => {
    // Set the button-clicked state to true when the button is clicked
    setIsButtonClicked(true);
 };

 return (
    <div>
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
          <p>Description: {weatherData.current.condition.text}</p>
        </>
      )}
    </div>
 );
};

export default Weather;

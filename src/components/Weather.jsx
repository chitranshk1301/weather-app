import React from 'react';

const Weather = ({ weatherData }) => {
 return (
    <div className="weather-container">
      <h2>{weatherData.name}, {weatherData.sys.city}</h2>
      <div className="weather-info">
        <img src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description} />
        <p>{Math.round(weatherData.main.temp)}°C</p>
        <p>{weatherData.weather[0].description.toUpperCase()}</p>
        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      </div>
    </div>
 );
};

export default Weather;

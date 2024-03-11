import React from 'react';

const Forecast = ({ forecastData }) => {
 return (
    <div className="forecast-container">
      {forecastData.map((day, index) => (
        <div key={index} className="forecast-day">
          <h3>{day.date}</h3>
          <img src={`https://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt={day.weather[0].description} />
          <p>{Math.round(day.temp.max)}°C / {Math.round(day.temp.min)}°C</p>
          <p>{day.weather[0].description.toUpperCase()}</p>
        </div>
      ))}
    </div>
 );
};

export default Forecast;

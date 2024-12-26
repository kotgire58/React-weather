import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css'; // Import the CSS file
import { SearchCity } from '../api/City';
const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  

  const apiKey = '5c50462695fd2a355c951ae9cee70cdb'; // Replace with your actual OpenWeatherMap API key

  const getWeather = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('City not found');
      setWeather(null);
    }
  };

  async function onSearch(e){
    setCity(e.target.value)
    const data = await SearchCity(e.target.value)
    setSearchResults(data)
  }
  function handleResultClick(place) {
    setCity(`${place.name},${place.adm_area1}`); // Set city name
    setSearchResults([]); // Clear suggestions
  }

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={getWeather}>
        <input
          type="text"
          value={city}
          onChange={onSearch}
          placeholder="Enter city"
          style={{ padding: '10px', fontSize: '1em', border: '1px solid #ccc', borderRadius: '5px', marginRight: '10px' }}
        />
        <div className='search-results'>
            <div className='results-container'>
              {searchResults.map((place) => (
                <div
                  className='result'
                  key={place.place_id}
                  onClick={() => handleResultClick(place)} // Handle click

                >
                  {place.name}, {place.adm_area1}, {place.country}
                </div>
              ))}
            </div>
          </div>
        <button type="submit">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Feels like: {weather.main.feels_like} °C</p>
          <p>Description: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;

import React, { useState, useEffect } from 'react';
import CitySelector from './CitySelector';

export default function CitiesPage() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!city) return;

    const apiKey = 'e247fc6f87784bb38f943018250105';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    setLoading(true);
    console.log('Fetching weather for:', city);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('Weather data:', data);
        setWeather({
          temp: data.current.temp_c,
          desc: data.current.condition.text,
          icon: data.current.condition.icon,
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching weather:', err);
        setWeather(null);
        setLoading(false);
      });
  }, [city]);

  return (
    <div className="cities-page">
      <div className="city-card">
        <h1>Cities</h1>
        <p>Select a city to get started:</p>
        <CitySelector selectedCity={city} onSelectCity={setCity} />

        {loading && <p>Loading weather...</p>}

        {weather && (
          <div className={`weather-info ${weather ? 'show' : ''}`}>
            <p>
              Right now, the weather in <strong>{city}</strong> is {weather.desc}, {weather.temp}°C.
              <img src={weather.icon} alt="Weather icon" className="weather-icon" />
            </p>
            <a
              href={`https://www.google.com/maps/search/${city}`}
              target="_blank"
              rel="noopener noreferrer"
              className="maps-link"
            >
              View {city} on Google Maps
            </a>
          </div>
        )}
    </div>
  </div>
  );
}
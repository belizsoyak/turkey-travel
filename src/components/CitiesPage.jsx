import React, { useState, useEffect, useRef } from 'react';
import CitySelector from './CitySelector';
import mapboxgl from 'mapbox-gl';

export default function CitiesPage() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!city) return;

    const apiKey = 'e247fc6f87784bb38f943018250105';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setWeather({
          temp: data.current.temp_c,
          desc: data.current.condition.text,
          icon: data.current.condition.icon,
          lat: data.location.lat,
          lon: data.location.lon,
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching weather:', err);
        setWeather(null);
        setLoading(false);
      });
  }, [city]);

  useEffect(() => {
    if (!weather) return;
  
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmVsaXpzb3lhayIsImEiOiJjbWE1bTZvdmgwajNpMmxweWFhc21lZTFxIn0.x5h3NkqOlNmAeMa1ykGO6Q';
  
    if (map.current) {
      map.current.remove();
    }
  
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v11', 
      center: [weather.lon, weather.lat],
      zoom: 10,
    });

    map.current.addControl(new mapboxgl.NavigationControl());
  
  }, [weather]);

  return (
    <div className="cities-page">
      <div className="city-card">
        <h1>Plan Your Visit</h1>
        <p>Select a city to explore its current weather and location:</p>

        <CitySelector selectedCity={city} onSelectCity={setCity} />

        {loading && <p>Loading weather...</p>}

        {weather && (
          <div className={`weather-info show`}>
            <p>
              Right now, the weather in <strong>{city}</strong> is {weather.desc}, {weather.temp}°C.
              <img src={weather.icon} alt="Weather icon" className="weather-icon" />
            </p>

            <div
              ref={mapContainer}
              className="map-container"
              style={{
                width: '100%',
                height: '400px',
                marginTop: '20px',
                borderRadius: '10px',
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}

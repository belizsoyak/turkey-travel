import React, { useState, useEffect, useRef } from 'react';
import CitySelector from './CitySelector';
import mapboxgl from 'mapbox-gl';
import { citiesData } from './CityShowcase';

export default function CitiesPage() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const mapContainer = useRef(null);
  const map = useRef(null);

  //fetch weather data based on city chosen
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

  // create or change map
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

  // add city to bucket list
  function handleAddCity() {
    fetch('http://localhost:4000/savedCities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: city,
        image: getCityImage(city),
      }),
    })
      .then(res => res.json())
      .then(() => {
        alert(`${city} was added to your list!`);
      })
      .catch(err => console.error('Error adding city:', err));
  }

  // get added city's name and image from cities list
  function getCityImage(cityName) {
    const foundCity = citiesData.find((c) => c.name === cityName);
    return foundCity?.image || '';
  }

  return (
    <div className="cities-page-wrapper">
      <div className="cities-page">
        <div className="city-card">
          <h1>Plan Your Visit</h1>
          <p>Select a city to explore its current weather and location:</p>
  
          <CitySelector selectedCity={city} onSelectCity={setCity} />
  
          {loading && <p>Loading weather...</p>}
  
          {weather && (
            <>
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
            </>
          )}
        </div>
  
        {weather && (
          <button
          onClick={handleAddCity}
          className="floating-save-btn saved-btn"
        >
          Click here to add this city to your travel list!
        </button>
        )}
      </div>
    </div>
  );
}

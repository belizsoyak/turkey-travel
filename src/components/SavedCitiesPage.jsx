import React, { useState, useEffect } from 'react';

export default function SavedCitiesPage() {
  const [savedCities, setSavedCities] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/savedCities')
      .then(res => res.json())
      .then(data => setSavedCities(data));
  }, []);

  return (
    <div className="saved-cities-page">
      <h1>My Travel Bucket List</h1>
      {savedCities.length === 0 ? (
        <p>No cities saved yet!</p>
      ) : (
        <div className="saved-cities-list">
          {savedCities.map((city) => (
            <div key={city._id} className="city-card">
              <h2>{city.name}</h2>
              {city.image && <img src={city.image} alt={city.name} style={{ width: '200px', borderRadius: '8px' }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
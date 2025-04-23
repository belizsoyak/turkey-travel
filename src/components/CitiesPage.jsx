import { useState } from 'react';
import CitySelector from './CitySelector';

export default function CitiesPage() {
  const [city, setCity] = useState('');

  return (
    <div className="cities-page">
      <h1>Cities</h1>
      <p>Select a city to get started:</p>
      <CitySelector selectedCity={city} onSelectCity={setCity} />
      {city && <p>You selected: {city}</p>}
    </div>
  );
}
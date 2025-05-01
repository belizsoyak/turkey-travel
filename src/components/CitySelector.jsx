import React from 'react';

const cities = [
    'Istanbul',
    'Ankara',
    'Izmir',
    'Antalya',
    'Bursa',
    'Adana',
    'Konya',
    'Gaziantep',
    'Şanlıurfa',
    'Diyarbakır',
    'Kayseri',
    'Eskişehir',
    'Samsun',
    'Van',
    'Cappadocia',
    'Erzurum',
    'Sivas',
    'Balıkesir',
    'Denizli',
    'Aydın',
    'Muğla',
    'Manisa',
    'Kahramanmaraş',
    'Hatay',
    'Kütahya',
    'Aksaray',
    'Niğde',
    'Karaman'
  ];

  export default function CitySelector({ selectedCity, onSelectCity }) {
    return (
      <select value={selectedCity} onChange={(e) => onSelectCity(e.target.value)}>
        <option value="">-- Choose a city --</option>
        {cities.map((city, index) => (
          <option key={index} value={city}>{city}</option>
        ))}
      </select>
    );
  }


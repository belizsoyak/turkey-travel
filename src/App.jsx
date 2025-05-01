import './App.css';
import './index.css';
import { useState } from 'react';
import CitySelector from './components/CitySelector';
import Header from './components/Header';
import Home from './components/Home';
import SocialLinks from './components/SocialLinks';
import CityShowcase from './components/CityShowcase';

function App() {
  const [city, setCity] = useState('');

  return (
    <>
      <Home />
      <CityShowcase />

    <div>
      <h1>Let's explore...</h1>
    </div>

    </>
  );
}

export default App;
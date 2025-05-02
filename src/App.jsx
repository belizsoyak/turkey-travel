import './App.css';
import './index.css';
import { useState } from 'react';
import Home from './components/Home';
import CityShowcase from './components/CityShowcase';

function App() {
  const [city, setCity] = useState('');

  return (
    <>
      <Home />
      <CityShowcase />
    </>
  );
}

export default App;
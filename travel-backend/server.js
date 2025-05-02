const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/travel')
  .then(() => {
    console.log('Connected to MongoDB!');
    app.listen(4000, () => {
      console.log('🚀 Server running on http://localhost:4000');
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));


const CitySchema = new mongoose.Schema({
  name: String,
  image: String,  
});
const City = mongoose.model('City', CitySchema);

// clear out when refreshed
City.deleteMany({})
  .then(() => console.log('Cleared all saved cities (fresh start).'))
  .catch(err => console.error('Failed to clear cities:', err));

// get
app.get('/savedCities', async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching from DB' });
  }
});

// post
app.post('/savedCities', async (req, res) => {
  const { name, image } = req.body;
  try {
    const city = new City({ name, image });
    await city.save();
    res.json(city);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving to DB' });
  }
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/travel')
  .then(() => {
    console.log('Connected to MongoDB!');
    app.listen(4000, () => {
      console.log('🚀 Server running on http://localhost:4000');
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));


// Define a simple schema/model to read your test doc
const TestSchema = new mongoose.Schema({ name: String });
const Test = mongoose.model('Test', TestSchema);

// GET /savedCities (just for testing!)
app.get('/savedCities', async (req, res) => {
  try {
    const docs = await Test.find();
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching from DB' });
  }
});

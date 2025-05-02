const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/travel', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection failed:', err);
    process.exit(1);  
  });
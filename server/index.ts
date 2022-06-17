import mongoose from 'mongoose';
import dotenv from 'dotenv';

import app from './app';

dotenv.config();

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// connect to database
mongoose.connect(DB).then((con) => {
  console.log(con.connection);
  console.log('DB connection successful');
});

// create schema for the model
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

// create a model
const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Forest Hiker',
  rating: 4.7,
  price: 497,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log('ERROR: ', err);
  });

const port = process.env.SERVER_PORT || 8000;

console.log(process.env.SERVER_PORT);

app.get('/', (req, res) => {
  res.send('hello from the server');
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

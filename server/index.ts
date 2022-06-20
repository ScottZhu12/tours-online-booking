import { connect } from 'mongoose';
import dotenv from 'dotenv';

import app from './app';

dotenv.config();

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const runTour = async () => {
  // connect to mongodb
  await connect(DB);
};

runTour().catch((err) => {
  console.log(err);
});

const port = process.env.SERVER_PORT || 8000;

app.get('/', (req, res) => {
  res.send('hello from the server');
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

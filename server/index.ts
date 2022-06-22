import { connect, HydratedDocument } from 'mongoose';
import dotenv from 'dotenv';

import app from './app';

dotenv.config();

const run = async () => {
  // connect to mongodb
  const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );
  await connect(DB);
};

run().catch((err) => console.log(err));

const port = process.env.SERVER_PORT || 8000;

app.get('/', (req, res) => {
  res.send('hello from the server');
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

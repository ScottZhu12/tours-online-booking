import dotenv from 'dotenv';

import app from './app';

dotenv.config();

const port = process.env.SERVER_PORT || 8000;

console.log(process.env.SERVER_PORT);

app.get('/', (req, res) => {
  res.send('hello from the server');
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

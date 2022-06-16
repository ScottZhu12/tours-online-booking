import express from 'express';
import morgan from 'morgan';

import tourRouter from './routes/tourRouter';
import userRouter from './routes/userRouter';

const app = express();
// create a middleware for handling response and request
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;

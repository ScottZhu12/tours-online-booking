import express from 'express';

import {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} from '../controllers/tourController';

const tourRouter = express.Router();

// get() method and post() method share the same url
tourRouter.route('/').get(getAllTours).post(createTour);
// get() method, patch() method, and delete() method share the same url
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export default tourRouter;

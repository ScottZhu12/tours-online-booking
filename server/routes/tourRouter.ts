import express from 'express';

import {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
} from '../controllers/tourController';

const tourRouter = express.Router();

tourRouter.param('id', checkID);

// get() method and post() method share the same url
tourRouter.route('/').get(getAllTours).post(checkBody, createTour);
// get() method, patch() method, and delete() method share the same url
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export default tourRouter;

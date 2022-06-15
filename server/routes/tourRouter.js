const express = require('express');

const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourController');

const router = express.Router();

// get() method and post() method share the same url
router.route('/').get(getAllTours).post(createTour);
// get() method, patch() method, and delete() method share the same url
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;

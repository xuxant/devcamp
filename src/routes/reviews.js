const express = require('express');
const {
  getReviews,
  getSingleReviews,
  addReviews,
  updateReviews,
  deleteReviews
} = require('../controllers/reviews');

const Review = require('../models/Review');

const advancedResults = require('../middleware/advanceresult');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advancedResults(Review, {
      path: 'bootcamp',
      select: 'name description'
    }),
    getReviews
  )
  .post(protect, authorize('user', 'admin'), addReviews);
router
  .route('/:id')
  .get(getSingleReviews)
  .put(protect, authorize('user', 'admin'), updateReviews)
  .delete(protect, authorize('user', 'admin'), deleteReviews);

module.exports = router;

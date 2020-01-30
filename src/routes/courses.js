const express = require('express');
const {
  getCourses,
  getCourse,
  addCourses,
  updateCourses,
  deleteCourses
} = require('../controllers/courses');

const { protect, authorize } = require('../middleware/auth');

const Course = require('../models/Course');
const advancedResults = require('../middleware/advanceresult');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advancedResults(Course, {
      path: 'bootcamp',
      select: 'name description'
    }),
    getCourses
  )
  .post(protect, addCourses);
router
  .route('/:id')
  .get(getCourse)
  .put(protect, authorize('publisher', 'admin'), updateCourses)
  .delete(protect, authorize('publisher', 'admin'), deleteCourses);

module.exports = router;

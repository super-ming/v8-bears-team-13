const express = require('express');
const cors = require('cors');
const passport = require('passport');

// const authController = require('../controllers/auth');
const historyController = require('../controllers/history');

const router = express.Router();

// @route   GET api/history/current-month/:id
// @desc    get current entries for this month
// @access  Private
router.get('/current-month/', passport.authenticate('jwt', { session: false }), historyController.getCurrentMonth);


module.exports = router;

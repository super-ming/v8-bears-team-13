const express = require('express');
const passport = require('passport');

const historyController = require('../controllers/history');

const router = express.Router();

// @route   GET api/history/current-month
// @desc    get current entries for this month
// @access  Private
router.get('/month', passport.authenticate('jwt', { session: false }), historyController.getHistory);


module.exports = router;

const express = require('express');
const cors = require('cors');
const passport = require('passport');

const authController = require('../controllers/auth');
const entryController = require('../controllers/entry');

const router = express.Router();

// @route   GET api/entries
// @desc    get current entries
// @access  Private
router.get('/latest-entries/:id', passport.authenticate('jwt', { session: false }), entryController.getLatestEntries);

// @route   GET api/entries/add-entry
// @desc    add an entry
// @access  Private
router.post('/add-entry', passport.authenticate('jwt', { session: false }), authController.addEntry);

module.exports = router;
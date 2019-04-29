const express = require('express');
const cors = require('cors');
const passport = require('passport');

const authController = require('../controllers/auth');
const entryController = require('../controllers/entry');

const router = express.Router();

// @route   GET api/auth/entries
// @desc    get current entries
// @access  Private
router.get('/entries', passport.authenticate('jwt', { session: false }), entryController.getLatestEntries);

// @route   GET api/auth/add-entry
// @desc    add an entry
// @access  Private
router.post('/add-entry', passport.authenticate('jwt', { session: false }), authController.addEntry);
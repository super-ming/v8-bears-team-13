const express = require('express');
const cors = require('cors');
const passport = require('passport');

const authController = require('../controllers/auth');
const entryController = require('../controllers/entry');

const router = express.Router();

// @route   GET api/entries/latest-entries/:id
// @desc    get current entries
// @access  Private
router.get('/latest-entries/:id', passport.authenticate('jwt', { session: false }), entryController.getLatestEntries);

// @route   POST api/entries/add-entry
// @desc    add an entry
// @access  Private
router.post('/add-entry', passport.authenticate('jwt', { session: false }), entryController.addEntry);

// @route   PUT api/entries/add-entry
// @desc    add an entry
// @access  Private
router.put('/edit-entry', passport.authenticate('jwt', { session: false }), entryController.editEntry);

module.exports = router;
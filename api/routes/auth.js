const express = require('express');
const cors = require('cors');

const authController = require('../controllers/auth');

const router = express.Router();

router.options('/register', cors());

// All routes in this file start with `api/auth`

/*  @route   GET api/auth/test
    @desc    Test auth route
    @access  Public */
router.get('/test', (req, res) => res.json({ msg: 'Auth Route reached' }));

/*  @route   GET api/auth/users
    @desc    Test route to get all users
    @access  Public */
router.get('/users', authController.getUsers);

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', cors(), authController.validate('register'), authController.register);

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', authController.postLogin);

// @route   GET api/auth/current
// @desc    Return current user
// @access  Private
router.get('/current', authController.getCurrentUser);

module.exports = router;

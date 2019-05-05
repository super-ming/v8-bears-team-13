const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator/check');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const keys = require('../config/keys');
const User = require('../models/User');

// encrypt plain text password with bcrypt
const hashPassword = (password) => {
  const saltRounds = 12;
  return new Promise((resolve, reject) => bcrypt.hash(password, saltRounds, (err, hash) => {
    err ? reject(err) : resolve(hash);
  }));
};

// Validate Sign Up form input
exports.validate = (method) => {
  switch (method) {
    case 'register': {
      return [
        body('username', 'Please enter an username.')
          .trim()
          .exists()
          .isString()
          .isLength({ min: 1 }),
        body('email', 'Invalid email')
          .trim()
          .exists()
          .isEmail()
          .normalizeEmail(),
        body('password', 'Your password must have at least 6 characters.')
          .exists()
          .isLength({ min: 6 })
      ];
    }
    default: {
      return null;
    }
  }
};

// Register a new user
exports.register = async (req, res, next) => {
  // get user from request body
  const { username, email, password } = req.body;

  // format the error from validatorResult
  const errorFormatter = ({
    location, msg, param, value, nestedErrors
  }) => `${msg}`;

  const result = validationResult(req).formatWith(errorFormatter);

  // If there are validation errors from express-validator
  if (!result.isEmpty()) {
    res.status(400);
    return next(new Error(result.array()));
  }

  const existingUser = await User.findOne(username);
  const existingEmail = await User.findByEmail(email);

  if (existingUser) {
    return res
      .status(409)
      .json({ error: 'This username is already taken. Please choose another one.' });
  }

  if (existingEmail) {
    return res
      .status(409)
      .json({ error: 'This email is already taken. Please choose another one.' });
  }

  try {
    const hashedPassword = await hashPassword(password);
    const newUser = await User.createUser(email, username, hashedPassword);
    res.json(newUser);
  } catch (err) {
    return next(err);
  }
};

exports.getUsers = (req, res) => {
  User.findAll()
    .then((users) => {
      res.json({
        message: 'Success',
        data: users
      });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.json({
        message: 'Success',
        data: user
      });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

exports.postLogin = (req, res, next) => {
  const { user } = req;
  const { username, password } = req.body;
  passport.authenticate('local', { session: false }, async (error, user) => {
    if (error) {
      res.status(400).json({ error });
      res.end();
    } else {
      // create payload for JWT token
      const userId = await User.findUserId(username);
      const payload = {
        username,
        userId: userId.id,
        expires: moment().add(1, 'day')
      };

      // assigns payload to req.user
      req.login(payload, { session: false }, (error) => {
        if (error) {
          res.status(400).send({ error });
        }
        // generate a signed json web token and return it in the response
        const token = jwt.sign(JSON.stringify(payload), keys.secret);

        // assign our jwt to the cookie
        // change to secure true in prod, but false in dev for cookie to work
        const useSecureCookies = process.env.NODE_ENV === 'production';

        res.cookie('jwt', token, {
          httpOnly: true,
          secure: useSecureCookies,
          expires: new Date(Date.now() + 900000)
        });

        res.status(200).send(payload);
      });
    }
  })(req, res, next);
};

exports.getCurrentUser = (req, res) => res.json({ msg: 'Current user' });

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { body, check, validationResult } = require('express-validator/check');


// encrypt plain text password with bcrypt
const hashPassword = (password) => {
  const saltRounds = 12;
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, saltRounds, (err, hash) => {
      err ? reject(err) : resolve(hash)
    })
  )
};

// Do auth-related stuff...

// Validate Sign Up form input
exports.validate = (method) => {
  switch(method) {
    case 'register': {
      return [
          body('username', 'Please enter an username.').exists().isString().trim(),
          body('email', 'Invalid email').exists().isEmail().normalizeEmail(),
          body('password', 'Your password must have at least 6 characters.').exists().isLength({min: 6})
      ]
    }
  }
};

// Register a new user
exports.register = (req, res, next) => {
  // get user from request body
  const {username, email, password} = req.body;
  if(!email) {
    res.status(400).send({ error: 'You must provide an email.'})
  } else if (!username) {
    res.status(400).send({ error: 'You must provide an username.'})
  } else if (!password) {
    res.status(400).send({ error: 'You must provide a password.'})
  }
  // format the error from validatorResult
  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    return `${msg}`;
  };

  const result = validationResult(req).formatWith(errorFormatter);

  if(!result.isEmpty()) {
      res.status(400);
      return next(new Error(result.array()))
  } else {
     // check if username already exist
    User.findOneByUsername(username) 
    .then(foundUser => {
      if(foundUser !== null) {
        res.json('This username is already taken. Please choose another one.')
      } else {
        hashPassword(password)
          .then((hashedPassword) => {
            delete password;
            // set user's password to encrypted password and add to database
            return User.createUser(username, email, hashedPassword)
              .then(newUser => {
                res.json(newUser);
              })
              .catch(err => {
                return next(err)});
              })
    }})
    .catch(err => {
      console.log(err)});
  }
};

exports.getUsers = (req, res) => {
  User.findAll()
    .then(users => {
      res.json({
        message: 'Success',
        data: users
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      res.json({
        message: 'Success',
        data: user
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

exports.postLogin = (req, res) => res.json({ msg: 'User was logged in!' });

exports.getCurrentUser = (req, res) => res.json({ msg: 'Current user' });

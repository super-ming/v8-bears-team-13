const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

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

// Register a new user
exports.register = (req, res, next) => {
  // get user from request body
  const {email, username, password} = req.body;
  if(!email || !username || !password) {
    res.status(400).send({ error: 'You must provide an username, email, and password.'})
  }
  // check if username already exist
  User.findOne(username)
  .then(foundUser => {
    if(foundUser !== null) {
      res.json('This username is already taken. Please choose another one.')
    } else {
      hashPassword(password)
        .then((hashedPassword) => {
          delete password;
          // set user's password to encrypted password and add to database
          return User.createUser(email, username, hashedPassword)
            .then(newUser => {
              res.json(newUser);
            })
            .catch(err => {
              return next(err)});
            })
  }})
  .catch(err => {
    console.log(err)});
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

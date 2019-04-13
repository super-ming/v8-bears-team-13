const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const passport = require('passport');
const {secret} = require('../config/secret');
const jwt = require('jsonwebtoken');

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

exports.postLogin = (req, res, next) => {
  // res.json({ msg: 'User was logged in!' });
  const {user} = req;
  const { username, password } = req.body;
  passport.authenticate('local', {session: false}, (error, user) => {

      if (error) {
        res.status(400).json({ error });
        res.end();
      } else {
      // create payload for JWT token
      const payload = {
        username: username,
        expires: Date.now() + 1
      };

      // assigns payload to req.user
      req.login(payload, {session: false}, (error) => {
        if (error) {
          res.status(400).send({ error });
        }
        // generate a signed json web token and return it in the response */
        const token = jwt.sign(JSON.stringify(payload), secret);

        // assign our jwt to the cookie
        res.cookie('jwt', token, { httpOnly: true, secure: false });
        
        res.status(200).send(payload);
      });
    }
    }
    
  
  )(req, res, next);

};



exports.getCurrentUser = (req, res) => res.json({ msg: 'Current user' });

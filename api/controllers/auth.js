const User = require('../models/User');

// Do auth-related stuff...

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

exports.postRegister = (req, res) => res.json({ msg: 'User was registered!' });

exports.postLogin = (req, res) => res.json({ msg: 'User was logged in!' });

exports.getCurrentUser = (req, res) => res.json({ msg: 'Current user' });

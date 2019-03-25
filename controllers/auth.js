const User = require('../models/User');

// Do auth-related stuff...
exports.postRegister = (req, res, next) => {
  return res.json({ msg: 'User was registered!' });
}

exports.postLogin = (req, res, next) => {
  return res.json({ msg: 'User was logged in!' });
}

exports.getCurrentUser = (req, res, next) => {
  return res.json({ msg: 'Current user' });
}
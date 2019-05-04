const moment = require('moment');
const jwt = require('jsonwebtoken');

const History = require('../models/History');
const keys = require('../config/keys');

exports.getHistory = async (req, res) => {
  const userid = (jwt.verify(req.cookies.jwt, keys.secret)).userId;
  const num = req.params.num;
  console.log(req.params.num);
  try {
    const histCurrMonth = await History.getHistory(userid, num);
    res.json(histCurrMonth);
  } catch (err) {
    throw new Error(err);
  }
};




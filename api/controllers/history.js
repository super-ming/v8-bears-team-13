const moment = require('moment');
const jwt = require('jsonwebtoken');

const History = require('../models/History');
const keys = require('../config/keys');

exports.getHistory = async (req, res) => {
  const userid = (jwt.verify(req.cookies.jwt, keys.secret)).userId;
  const num = req.query.num;
  const transact = req.query.transact;
  const str = req.query.str;
  console.log('req.query ', req.query);

  try {
    const histCurrMonth = await History.getHistory(userid, num, transact, str);
    res.json(histCurrMonth);
  } catch (err) {
    throw new Error(err);
  }
};




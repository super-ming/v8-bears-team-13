const moment = require('moment');
const jwt = require('jsonwebtoken');

const History = require('../models/History');
const keys = require('../config/keys');

exports.getCurrentMonth = async (req, res) => {
  const userid = req.params.userid;
  try {
    const histCurrMonth = await History.getCurrentMonth(userid);
    res.json(histCurrMonth);
  } catch (err) {
    throw new Error(err);
  }
};




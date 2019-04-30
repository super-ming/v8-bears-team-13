const Entry = require('../models/Entry');
const moment = require('moment');

exports.getLatestEntries = async (req, res) => {
  const userData = req.params.id;
  try {
    const latestEntries = await Entry.getLatestEntries(userData);
    res.json(latestEntries);
  } catch (err) {
    throw new Error(err);
  }
};

exports.addEntry = async (req, res) => {
  const entryData = req.body;
  entryData.created_at = moment();
  try {
    const newEntry = await Entry.addEntry(entryData);
    res.json(newEntry);
  } 
  catch (err) {
    throw new Error(err);
  }
};

exports.editEntry = async (req, res) => {
  const entryData = req.body;
  entryData.created_at = moment();
  try {
    const updatedEntry = await Entry.editEntry(entryData);
    res.json(updatedEntry);
  } 
  catch (err) {
    throw new Error(err);
  }
};
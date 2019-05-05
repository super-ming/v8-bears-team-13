const moment = require('moment');
const jwt = require('jsonwebtoken');

const Entry = require('../models/Entry');
const keys = require('../config/keys');

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

  let decodedJwt;
  try {
    decodedJwt = jwt.verify(req.cookies.jwt, keys.secret);
  } catch (err) {
    throw new Error(err);
  }

  const { userId } = decodedJwt;

  try {
    const newEntry = await Entry.addEntry(entryData, userId);
    res.json(newEntry);
  } catch (err) {
    throw new Error(err);
  }
};

exports.editEntry = async (req, res) => {
  const entryData = req.body;
  entryData.created_at = moment();

  let decodedJwt;
  try {
    decodedJwt = jwt.verify(req.cookies.jwt, keys.secret);
  } catch (err) {
    throw new Error(err);
  }

  const { userId } = decodedJwt;

  try {
    const updatedEntry = await Entry.editEntry(entryData, userId);
    res.json(updatedEntry);
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteEntry = async (req, res) => {
  // Convert entryId to a number
  const entryId = req.params.id - 0;

  let decodedJwt;
  try {
    decodedJwt = jwt.verify(req.cookies.jwt, keys.secret);
  } catch (err) {
    throw new Error(err);
  }

  // Convert to a number
  const { userId } = decodedJwt;

  try {
    const entryToDelete = await Entry.getEntryById(entryId);

    // This entry doesn't belong to the current user
    if (!entryToDelete.user_id === userId) throw new Error('Not authorized to do that.');

    await Entry.deleteEntry(entryId);
    res.status(204).json({ message: 'Entry successfully deleted' });
  } catch (err) {
    throw new Error(err);
  }
};

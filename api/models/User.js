const db = require('../db/config');

exports.findAll = () => db.query('SELECT * FROM users');
exports.findById = id => db.oneOrNone('SELECT * FROM users WHERE id = $1', [id]);

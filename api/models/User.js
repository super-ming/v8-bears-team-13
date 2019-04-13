const db = require('../db/config');

const createUser = (email, username, password) => {
    return db.one('INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *',
    [email, username, password]);
};

exports.createUser = createUser;
exports.findAll = () => db.query('SELECT * FROM users');
exports.findById = id => db.oneOrNone('SELECT * FROM users WHERE id = $1', [id]);
exports.findOne = username => db.oneOrNone('SELECT 1 FROM users where lower(username)=$1', [username.toLowerCase()]);
exports.findPassword = username => db.oneOrNone('SELECT password from users where lower(username)=$1', [username.toLowerCase()]);

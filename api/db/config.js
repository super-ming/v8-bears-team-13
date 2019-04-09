const options = {
  query: (e) => {
    console.log(e.query);
  }
};

const pgp = require('pg-promise')(options);
const keys = require('../config/keys');

// eslint-disable-next-line consistent-return
const setupDB = () => {
  if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    return pgp({
      database: keys.databaseName,
      port: 5432,
      host: 'localhost',
      user: keys.user,
      password: keys.password
    });
  }

  if (process.env.NODE_ENV === 'production') {
    return pgp(keys.databaseUrl);
  }
};

const db = setupDB();

module.exports = db;

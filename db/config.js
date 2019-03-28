const options = {
  query: (e) => {
    console.log(e.query);
  }
};

const pgp = require('pg-promise')(options);

// eslint-disable-next-line consistent-return
const setupDB = () => {
  if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    return pgp({
      database: 'expense-api',
      port: 5432,
      host: 'localhost'
    });
  }

  if (process.env.NODE_ENV === 'production') {
    return pgp(process.env.DATABASE_URL);
  }
};

const db = setupDB();

module.exports = db;

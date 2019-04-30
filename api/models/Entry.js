const moment = require('moment');
const db = require('../db/config');

exports.addEntry = async (data) => {
  const { userId, transaction, category, entry, amount, full_date, created_at, recurring } = data;
  return db.one('INSERT INTO entries (user_id, transact_id, category_id, entry_desc, amount, full_date, created_at, recurring) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [userId, transaction, category, entry, amount, full_date, created_at, recurring]);
};

exports.editEntry = async (data) => {
  const { userId, transaction, category, entry, amount, full_date, created_at, recurring } = data;
  return db.one('INSERT INTO entries (user_id, transact_id, category_id, entry_desc, amount, full_date, created_at, recurring) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [userId, transaction, category, entry, amount, full_date, created_at, recurring]);
};

exports.getLatestEntries = async (id) => {
  return db.task('getLatestEntries', async (t) => {
    const previousMonthStart = moment().date(0).startOf('month').startOf('day').format('YYYY-MM-DD HH:mm:ss');
    return db.any('SELECT * from entries JOIN categories on entries.category_id = categories.id WHERE entries.user_id = $1 AND entries.created_at >= $2', [id, previousMonthStart])
      .then(data => {
        return data;
      })
        .catch(err => {
        console.error(err);
      });
  })
};

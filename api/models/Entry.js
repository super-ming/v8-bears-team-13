const moment = require('moment');
const db = require('../db/config');

exports.addEntry = async (data) => {
  const { userId, transaction, category, entry, amount, full_date, created_at, recurring } = data;
  return db.one('INSERT INTO entries (user_id, transact_id, category_id, entry_desc, amount, full_date, created_at, recurring) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [userId, transaction, category, entry, amount, full_date, created_at, recurring]);
};

exports.editEntry = async (data) => {
  try {
    const { id, userId, transaction, category, entry, amount, full_date, created_at, recurring } = data;
    const user_id = userId;
    const transact_id = transaction;
    const category_id = category;
    const entry_desc = entry;
    const cs = db.$config.pgp.helpers.ColumnSet(['?id', 'user_id', 'transact_id', 'category_id', 'entry_desc', 'amount', 'full_date', 'created_at', 'recurring'], {table: { table: 'entries', schema: 'public'}});
    const update = db.$config.pgp.helpers.update({ id, user_id, transact_id, category_id, entry_desc, amount, full_date, created_at, recurring }, cs) + ' WHERE id = ' + id
    return db.any(update)
    /*
    return db.any('UPDATE entries SET (user_id, transact_id, category_id, entry_desc, amount, full_date, created_at, recurring) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) WHERE entries.id = $9 RETURNING * ',
      [userId, transaction, category, entry, amount, full_date, created_at, recurring, id])
    */
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
      })
  } catch (err) {
    console.log(err);
  }

};

exports.getLatestEntries = async (id) => {
  try {
    return db.task('getLatestEntries', async (t) => {
      const previousMonthStart = moment().date(0).startOf('month').startOf('day').format('YYYY-MM-DD HH:mm:ss');
      return db.any('SELECT entries.id, user_id, entries.transact_id, category_id, entry_desc, amount, full_date, created_at, recurring, category_desc FROM entries JOIN categories ON entries.category_id = categories.id WHERE entries.user_id = $1 AND entries.created_at >= $2 ORDER BY entries.created_at DESC', [id, previousMonthStart])
        .then(data => {
          return data;
        })
          .catch(err => {
          console.error(err);
        });
    })
  } catch (err) {
    console.log(err);
  }
};

exports.getEntryById = (entryId) => {
  try {
    return db.one('SELECT * FROM entries WHERE id = $1', [entryId]);
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteEntry = (entryId) => {
  try {
    db.one('DELETE FROM entries WHERE id = $1 RETURNING *', [entryId])
      .then(data => data);
  } catch (err) {
    throw new Error(err);
  }
};

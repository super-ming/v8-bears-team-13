const db = require('../db/config');


exports.addEntry = (data) => {
    const {transaction, category, entry, amount, full_date, created_at, recurring} = data;
    return db.one('INSERT INTO entries (user_id, transact_id, category_id, entry_desc, amount, full_date, created_at, recurring) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [2, transaction, category, entry, amount, full_date, created_at, recurring]);

};
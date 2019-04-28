const db = require('../db/config');
const User = require('./User');



exports.addEntry = async (data) => {
    const {username, transaction, category, entry, amount, full_date, created_at, recurring} = data;
    const userid = await User.findUserId(username).then(data => data.id);
    return db.one('INSERT INTO entries (user_id, transact_id, category_id, entry_desc, amount, full_date, created_at, recurring) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [userid, transaction, category, entry, amount, full_date, created_at, recurring]);

};


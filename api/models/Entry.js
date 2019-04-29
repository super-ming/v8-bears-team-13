const moment = require('moment');
const db = require('../db/config');

exports.addEntry = (data) => {
    const {transaction, category, entry, amount, full_date, created_at, recurring} = data;
    return db.one('INSERT INTO entries (user_id, transact_id, category_id, entry_desc, amount, full_date, created_at, recurring) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [2, transaction, category, entry, amount, full_date, created_at, recurring]);
};

exports.getLatestEntries = async (data) => {
    return await db.task('getLatestEntries', async (t) => {
        const previousMonthStart = moment().date(0).startOf('month').startOf('day').format('YYYY-MM-DD HH:mm:ss');
        const user = await t.one('SELECT id from users WHERE username = $1', [data.username]);
        return db.any('SELECT * from entries WHERE user_id = $1 AND created_at >= $2', [user.id, previousMonthStart])
            .then(data => {
                return data;
            })
            .catch(err => {
                console.error(err);
            });
    })
};
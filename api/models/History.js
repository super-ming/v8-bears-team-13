const moment = require('moment');
const db = require('../db/config');



// exports.getCurrentMonth = async (id) => {
//   try {
//     return db.task('getLatestEntries', async (t) => {
//       const previousMonthStart = moment().date(0).startOf('month').startOf('day').format('YYYY-MM-DD HH:mm:ss');
//       return db.any('SELECT entries.id, user_id, entries.transact_id, category_id, entry_desc, amount, full_date, created_at, recurring, category_desc FROM entries JOIN categories ON entries.category_id = categories.id WHERE entries.user_id = $1 AND entries.created_at >= $2 ORDER BY entries.created_at DESC', [id, previousMonthStart])
//         .then(data => {
//           return data;
//         })
//           .catch(err => {
//           console.error(err);
//         });
//     })
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.getCurrentMonth = async (userid) => {
  const currentMonth = moment().format('YYYY-MM');
  try {
    return db.any('SELECT entries.*, categories.category_desc FROM entries INNER JOIN categories ON entries.category_id = categories.id WHERE entries.user_id=$1 AND TO_CHAR(entries.full_date, "YYYY-MM")=$2', [userid, currentMonth])
      .then(data => {
        data;
      })
      .catch(err => {
        console.log(err);
      });
  } catch(err) {
    console.log(err);
  }
};

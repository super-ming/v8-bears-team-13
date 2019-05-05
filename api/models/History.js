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

exports.getHistory = async (userid, num) => {
  let time;

  if(num === '1') {
    // 1 month
    time = moment().subtract(1, 'month').format('YYYY-MM-DD');
  } else if(num === '3') {
    // 3 months
    time = moment().subtract(3, 'month').format('YYYY-MM-DD');
  } else if(num === '6') {
    // 6 months
    time = moment().subtract(6, 'month').format('YYYY-MM-DD');
  } else if(num === '12') {
    // 12 months
    time = moment().subtract(12, 'month').format('YYYY-MM-DD');
  } else if(num === '9999') {
    // all-time
    time = moment().subtract(9999, 'month').format('YYYY-MM-DD');
  }
  
  try {
    return db.query('SELECT entries.*, categories.category_desc FROM entries INNER JOIN categories ON entries.category_id = categories.id WHERE entries.user_id=$1 AND entries.full_date >= $2', [userid, time])
      .then(data =>  data)
      .catch(err => {
        console.log(err);
      });
  } catch(err) {
    console.log(err);
  }
};

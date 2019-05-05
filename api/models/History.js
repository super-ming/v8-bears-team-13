const moment = require('moment');
const db = require('../db/config');

exports.getHistory = async (userid, num, transact, str) => {
  let sqlQuery;
  let time;

  let type;

  if (num === '1') {
    // 1 month
    time = moment()
      .subtract(1, 'month')
      .format('YYYY-MM-DD');
  } else if (num === '3') {
    // 3 months
    time = moment()
      .subtract(3, 'month')
      .format('YYYY-MM-DD');
  } else if (num === '6') {
    // 6 months
    time = moment()
      .subtract(6, 'month')
      .format('YYYY-MM-DD');
  } else if (num === '12') {
    // 12 months
    time = moment()
      .subtract(12, 'month')
      .format('YYYY-MM-DD');
  } else if (num === '9999') {
    // all-time
    time = moment()
      .subtract(9999, 'month')
      .format('YYYY-MM-DD');
  }

  if (time && (transact === '2' || !transact)) {
    if (str) {
      sqlQuery = db.query(
        "SELECT entries.*, categories.category_desc FROM entries INNER JOIN categories ON entries.category_id = categories.id WHERE entries.user_id=$1 AND entries.full_date >= $2 AND entries.entry_desc LIKE '%$3:value%'",
        [userid, time, str]
      );
    } else {
      sqlQuery = db.query(
        'SELECT entries.*, categories.category_desc FROM entries INNER JOIN categories ON entries.category_id = categories.id WHERE entries.user_id=$1 AND entries.full_date >= $2',
        [userid, time]
      );
    }
  } else if (time && (transact === '0' || transact === '1')) {
    type = transact === '0' ? false : true;
    console.log('type', type);
    if (str) {
      sqlQuery = db.query(
        "SELECT entries.*, categories.category_desc FROM entries INNER JOIN categories ON entries.category_id = categories.id WHERE entries.user_id=$1 AND entries.full_date >= $2 AND entries.transact_id = $3 AND entries.entry_desc LIKE '%$4:value%'",
        [userid, time, type, str]
      );
    } else {
      sqlQuery = db.query(
        'SELECT entries.*, categories.category_desc FROM entries INNER JOIN categories ON entries.category_id = categories.id WHERE entries.user_id=$1 AND entries.full_date >= $2 AND entries.transact_id = $3',
        [userid, time, type]
      );
    }
  }

  try {
    return sqlQuery
      .then(data => data)
      .catch(err => {
        throw new Error(err);
      });
  } catch (err) {
    throw new Error(err);
  }
};

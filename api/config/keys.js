const devKeys = require('./keys_dev');
const prodKeys = require('./keys_prod');

// If in production mode, use production keys. Else, use dev keys
if (process.env.NODE_ENV === 'production') {
  module.exports = prodKeys;
} else {
  module.exports = devKeys;
}

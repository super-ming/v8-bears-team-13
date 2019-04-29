const express = require('express');
const bodyParser = require('body-parser');
const passport = require("passport");
const expressValidator = require('express-validator');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Routes
const authRoutes = require('./routes/auth');
const entryRoutes = require('./routes/entry');

const app = express();
const PORT = process.env.PORT || 5000;

// general error handler
const errorHandler = (err, req, res, next) => {
  res.send({error: err.message.split(',')})
}

// Setup body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// input validation
app.use(expressValidator());

// enable cors
app.use(cors({ credentials: true, origin: true }));

// Need to read cookie
app.use(cookieParser());

// passport strategies
require('./auth/auth');

// Routes will begin with `/api/auth`
app.use('/api/auth', authRoutes);
app.use('/api/entries', entryRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({ info: 'Node, Express, Postgres API' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

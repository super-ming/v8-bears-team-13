const express = require('express');
const bodyParser = require('body-parser');
const passport = require("passport");
const expressValidator = require('express-validator');
const cors = require('cors');

// Routes
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

const errorHandler = (err, req, res, next) => {
  res.send({error: err.message.split(',')})
}

// Setup body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(expressValidator());

app.use(cors());

// Routes will begin with `/api/auth`
app.use('/api/auth', authRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({ info: 'Node, Express, Postgres API' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

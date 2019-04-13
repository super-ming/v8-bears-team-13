const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const app = express();
const PORT = process.env.PORT || 5000;



// Setup body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());



require('./auth/auth');

const authRoutes = require('./routes/auth');

// Routes will begin with `/api/auth`
app.use('/api/auth', authRoutes);



app.get('/', (req, res) => {
  res.json({ info: 'Node, Express, Postgres API' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

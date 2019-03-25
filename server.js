const express = require('express');
const bodyParser = require("body-parser");
const passport = require("passport");

const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

// Setup body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes will begin with `/api/auth`
app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
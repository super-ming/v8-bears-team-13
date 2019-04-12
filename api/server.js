const express = require('express');
const bodyParser = require('body-parser');
const passport = require("passport");




// need passport JWT for JWT Strategy
const passportJWT = require('passport-jwt');

// passport strategies
// calling passport.authenticate('local') or passport.authenticate('jwt')
// will invoke the strategies 
// local strategy will authenticate user
// jwt token strategy will generate token
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

// need User for strategies
const User = require('./models/User');

// need bcrypt to compare input password to hashed password from db
const bcrypt = require('bcryptjs');

// need secret
const {secret} = require('./config/secret');


const myLocalStrategy = new LocalStrategy(
  async (username, password, done) => {
    try {
        //User.findOne returns '1' if user exists
        const user = await User.findOne(username)
            .then(foundUser => {
                foundUser === 1 ? username : foundUser
            });
        
        const match = await bcrypt.compare(password, User.findPassword(username));

        if(match) {
          return done(null, user);
        } else {
          return done('Incorrect username and/or password');
        }
    } catch (error) {
        done(error);
    }
  }
  
)

const myJWTStrategy = new JWTStrategy({
    jwtFromRequest: req => req.cookies.jwt,
    secretOrKey: secret,
  },
  (jwtPayload, done) => {
    if (Date.now() > jwtPayload.expires) {
      return done('jwt expired');
    }
    return done(null, jwtPayload);
  }
)

passport.use(myLocalStrategy);
passport.use(myJWTStrategy);


const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Setup body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes will begin with `/api/auth`
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ info: 'Node, Express, Postgres API' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

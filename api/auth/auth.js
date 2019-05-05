// need bcrypt to compare input password to hashed password from db
const bcrypt = require('bcryptjs');

const passport = require('passport');

// need passport JWT for JWT Strategy
const passportJWT = require('passport-jwt');

// need moment for time
const moment = require('moment');

// passport strategies
// calling passport.authenticate('local') or passport.authenticate('jwt')
// will invoke the strategies (think: calling action invokes reducers)
// local strategy will authenticate user
// jwt token strategy will generate token
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;

// need User for strategies
const User = require('../models/User');

// need secret
// used in tandem with token to generate a 'hashed' token value
const keys = require('../config/keys');

const myLocalStrategy = new LocalStrategy(
  // username and password are in req.body (default names are req.username and req.password)
  async (username, password, done) => {
    try {
      // User.findOne returns '1' if user exists
      const user = await User.findOne(username).then((foundUser) => {
        foundUser === 1 ? username : foundUser;
      });

      // promise, need await to store to variable
      const hashedPW = await User.findPassword(username).then(pw => (pw ? pw.password : null));

      const pwMatch = hashedPW ? await bcrypt.compare(password, hashedPW) : null;

      if (pwMatch) {
        return done(null, user);
      }
      return done('Incorrect username and/or password');
    } catch (error) {
      return done(error);
    }
  }
);

const myJWTStrategy = new JWTStrategy(
  {
    // extract jwt object from cookie
    jwtFromRequest: req => req.cookies.jwt,
    secretOrKey: keys.secret
  },
  (jwtPayload, done) => {
    if (moment() > jwtPayload.expires) {
      return done('jwt expired');
    }
    return done(null, jwtPayload);
  }
);

passport.use(myLocalStrategy);
passport.use(myJWTStrategy);

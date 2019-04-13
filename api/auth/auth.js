const passport = require("passport");

// need passport JWT for JWT Strategy
const passportJWT = require('passport-jwt');

// passport strategies
// calling passport.authenticate('local') or passport.authenticate('jwt')
// will invoke the strategies (think: action and reducers)
// local strategy will authenticate user
// jwt token strategy will generate token
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// need User for strategies
const User = require('../models/User');

// need bcrypt to compare input password to hashed password from db
const bcrypt = require('bcryptjs');

// need secret
// used in tandem with token to generate a 'hashed' token value
const {secret} = require('../config/secret');

const cookieExtractor = (req) => {
  console.log(req.cookies);
  let token = null;
  if (req && req.cookies)
  {
      token = req.cookies['jwt'];
  }
  return token;
};


const myLocalStrategy = new LocalStrategy(
  // username and password are in req.body (default names are req.username and req.password)
  async (username, password, done) => {
    try {
        //User.findOne returns '1' if user exists
        const user = await User.findOne(username)
            .then(foundUser => {
                foundUser === 1 ? username : foundUser;
            });
        
        // promise, need await to store to variable
        const hashedPW = await User.findPassword(username).then(pw => pw ? pw.password : null);
        
        const pwMatch = hashedPW ? await bcrypt.compare(password, hashedPW) : null;
        
        if(pwMatch) {
          return done(null, user);
        } else {
          return done('Incorrect username and/or password');
        }
    } catch (error) {
        return done(error);
    }
  }
);

const myJWTStrategy = new JWTStrategy({
    // extract jwt object from cookie
    jwtFromRequest: req => cookieExtractor(req),
    secretOrKey: secret
  },
  (jwtPayload, done) => {
    if (Date.now() > jwtPayload.expires) {
      return done('jwt expired');
    }
    return done(null, jwtPayload);
  }
);

passport.use(myLocalStrategy);
passport.use(myJWTStrategy);

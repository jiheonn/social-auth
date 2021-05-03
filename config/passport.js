const passport = require('passport');
const NaverStrategy = require('passport-naver').Strategy;

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new NaverStrategy({
    clientID: process.env['NAVER_CLIENT_ID'],
    clientSecret: process.env['NAVER_CLIENT_SECRET'],
    callbackURL: process.env['NAVER_CALLBACK']
  },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      done(null, profile);
    }
  ));
};
const passport = require('passport');
const NaverStrategy = require('passport-naver').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // Naver
  passport.use(new NaverStrategy({
    clientID: process.env['NAVER_CLIENT_ID'],
    clientSecret: process.env['NAVER_CLIENT_SECRET'],
    callbackURL: process.env['NAVER_CALLBACK']
  }, async (accessToken, refreshToken, profile, done) => {
    // console.log("[PROFILE] " + profile);
    console.log("[ACCESS_TOKEN] " + accessToken);
    console.log("[REFRESH_TOKEN] " + refreshToken);

    done(null, profile);
  }
  ));

  // Kakao
  passport.use(new KakaoStrategy({
    clientID: process.env['KAKAO_CLIENT_ID'],
    clientSecret: "",
    callbackURL: process.env['KAKAO_CALLBACK']
  }, async (accessToken, refreshToken, profile, done) => {
    // console.log("[PROFILE] " + profile);
    console.log("[ACCESS_TOKEN] " + accessToken);
    console.log("[REFRESH_TOKEN] " + refreshToken);

    done(null, profile);
  }
  ));
};
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const NaverStrategy = require('passport-naver').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;

const userQuery = require('../db/userQuery');

let selectUserInfo;

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // Local
  passport.use(new LocalStrategy({
    usernameField: 'id',  // form > input name 값
    passwordField: 'pwd'
  },
    async (id, pwd, done) => {
      // 회원정보 조회
      selectUserInfo = await userQuery.selectUserInfo(id);

      // 회원정보가 없는 경우
      if (selectUserInfo.length == 0) {
        done(null, false, { message: "Incorrect" });
      } else {
        selectUserInfo = selectUserInfo[0];
        // 비밀번호가 일치하지 않는 경우
        if (selectUserInfo.password != pwd) {
          done(null, false, { message: "Incorrect" });
        }

        console.log("[userInfo] " + selectUserInfo);
        done(null, selectUserInfo);
      }
    }
  ));

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
const express = require('express');
const passport = require('passport');
const router = express.Router();

// /auth/login
router.get('/login', (req, res) => {
  res.send(`
  <h3>Login Success</h3>
  <a href="/auth/logout"><button>로그아웃</button></a>
  <p>
    ${JSON.stringify(req.user)}
  </p>
  `);
});

// Local
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/auth/login',
    failureRedirect: '/',
    failureFlash: true
  })
);

// Naver
router.get('/login/naver',
  passport.authenticate('naver', { scope: ['profile'] })
);

router.get('/login/naver/callback',
  passport.authenticate('naver', { failureRedirect: '/auth/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

// Kakao
router.get('/login/kakao',
  passport.authenticate('kakao', { scope: ['profile'] })
);

router.get('/login/kakao/callback',
  passport.authenticate('kakao', { failureRedirect: '/auth/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    req.logout();
    res.redirect('/');
  });

  // req.logout();
  // req.session.save(() => {
  //   res.redirect('/');
  // })
});

module.exports = router
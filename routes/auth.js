const express = require('express');
const passport = require('passport');
const router = express.Router();

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
});

module.exports = router
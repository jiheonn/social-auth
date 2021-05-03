const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/login/naver',
  passport.authenticate('naver', { scope: ['profile'] })
);

router.get('/login/naver/callback',
  passport.authenticate('naver', { failureRedirect: '/auth/login' }),
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
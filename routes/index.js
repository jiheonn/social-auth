const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  if (req.user) {
    res.send(`
      <h3>Login Success</h3>
      <a href="/auth/logout"><img src="/images/naver_logout.png" /></a>
      <p>
        ${JSON.stringify(req.user, null, 2)}
      </p>
    `);
  } else {
    res.send(`
      <h3>Node Passport Social Login</h3>
      <a href="/auth/login/naver"><img src="/images/naver_login.png" /></a>
      <a href="/auth/login/kakao">Login with Kakao</a>
    `);
  }
});

module.exports = router;

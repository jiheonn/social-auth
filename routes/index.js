const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  if (req.user) {
    res.send(`
      <h3>Login Success</h3>
      <a href="/auth/logout"><button>로그아웃</button></a>
      <p>
        ${JSON.stringify(req.user, null, 2)}
      </p>
    `);
  } else {
    res.send(`
      <h3>Node Passport Social Login</h3>
      <a href="/auth/login/naver"><img src="/images/naver_login.png" width="300" /></a><br><br>
      <a href="/auth/login/kakao"><img src="/images/kakao_login.png" width="300" /></a>
    `);
  }
});

module.exports = router;

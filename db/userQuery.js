const mysql = require('mysql');
const dbConfig = require('./config');

let pool = mysql.createPool(dbConfig);

let sql;

// 회원정보 조회
exports.selectUserInfo = function selectUserInfo(id) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (!err) {
        sql = `
        SELECT
          *
        FROM
          teacher
        WHERE
          email = ?
        `;
        connection.query(sql, [id], (err, rows) => {
          if (err) reject(err);
          // query 결과 반환
          resolve(rows);
        });
      }
      // connection을 pool에 반환
      connection.release();
    });
  });
}
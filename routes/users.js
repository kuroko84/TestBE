var express = require("express");
var router = express.Router();

const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "test",
  password: "123456",
  port: 5432, // default PostgreSQL port
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  pool.query("SELECT * FROM cuahang", (error, results) => {
    if (error) {
      throw error;
    }
    res.json(results.rows);
  });
});

module.exports = router;

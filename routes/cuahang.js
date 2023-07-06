var express = require("express");
const db = require("../models/database");
const CuaHang = require("../models/CuaHang");

var router = express.Router();

// const { Pool } = require("pg");
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "test",
//   password: "123456",
//   port: 5432, // default PostgreSQL port
// });

/* GET cuahang. */
router.get("/tatca", function (req, res, next) {
  //   pool.query("SELECT * FROM cuahang", (error, results) => {
  //     if (error) {
  //       throw error;
  //     }
  //     res.json(results.rows);
  //   });
  CuaHang.findAll()
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => console.log(err));
});
// router.post("/themcuahang", function (req, res, next) {
//   Cuahangs.create({
//     macch: "MACCH001",
//     tencuahang: "Cửa hàng A",
//     diachi: "Địa chỉ A",
//     sdt: "0123456789",
//     email: "email@example.com",
//     anhlogo: "path/to/logo.jpg",
//   })
//     .then((cuahang) => {
//       console.log("Thêm dữ liệu thành công:", cuahang);
//     })
//     .catch((error) => {
//       console.error("Thêm dữ liệu thất bại:", error);
//     });
// });

module.exports = router;

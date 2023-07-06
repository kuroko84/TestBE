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

/* GET tat ca cua hang */
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

/* POST them cua hang*/
router.post("/themcuahang", function (req, res, next) {
  const { macch, tencuahang, diachi, sdt, email, anhlogo } = req.body;

  CuaHang.create({
    macch: macch,
    tencuahang: tencuahang,
    diachi: diachi,
    sdt: sdt,
    email: email,
    anhlogo: anhlogo,
  })
    .then((cuahang) => {
      console.log("Thêm dữ liệu thành công:", cuahang);
      res.status(201).json(cuahang); // Trả về dữ liệu đã tạo thành công
    })
    .catch((error) => {
      console.error("Thêm dữ liệu thất bại:", error);
      res
        .status(500)
        .json({ error: "Thêm dữ liệu thất bại" + error, err: error }); // Trả về lỗi nếu có
    });
});

module.exports = router;

var express = require("express");
const db = require("../models/database");
const CuaHang = require("../models/CuaHang");
const ChuCuaHang = require("../models/ChuCuaHang");
const YeuCau = require("../models/YeuCauLamViec");
const NguoiLam = require("../models/NguoiLam");

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
      console.log("Tìm kiếm thành công");
      res.status(200).json({
        M: "Tìm kiếm thành công",
        D: data,
      });
    })
    .catch((err) => {
      console.log("Lỗi tìm kiếm");
      res.status(500).json({
        M: "Lỗi tìm kiếm",
        E: err,
      });
    });
});

/* Get cửa hàng theo mã chủ cửa hàng */
router.get("/timkiem/:macch", function (req, res, next) {
  const macch = req.params.macch;
  CuaHang.findAll({
    where: { macch: macch },
  })
    .then((data) => {
      if (data != "") {
        console.log("Tìm kiếm thành công");
        res.status(200).json({
          M: "Tìm kiếm thành công",
          D: data,
        });
      } else {
        console.log("Không tìm thấy cửa hàng có mã chủ cửa hàng:", macch);
        res.status(404).json({
          M: "Không tìm thấy",
          E: "Không tìm thấy cửa hàng có mã chủ cửa hàng" + macch,
        });
      }
    })
    .catch((error) => {
      console.error("Lỗi tìm kiếm:", error);
      res.status(500).json({ M: "Lỗi tìm kiếm", E: error });
    });
});
/* GET Tìm nhân viên theo cửa hàng */
router.get("/nhanviencuahang/:macuahang", function (req, res, next) {
  const macuahang = req.params.macuahang;
  YeuCau.findAll({
    where: { macuahang: macuahang, trangthai: "lamviec" },
  })
    .then((data) => {
      if (data) {
        const promises = data.map((element) => {
          return NguoiLam.findOne({
            where: {
              id: element.manl,
            },
          });
        });

        return Promise.all(promises);
      } else {
        console.log("Không tìm nhân viên có mã cửa hàng: ", macuahang);
        res.status(404).json({
          M: "Không tìm thấy",
          E: "Không tìm nhân viên có mã cửa hàng: " + macuahang,
        });
      }
    })
    .then((results) => {
      const danhsachnhanvien = results.filter((nguoilam) => nguoilam !== null);
      if (results != "") {
        console.log("Tìm kiếm thành công");
        res.status(200).json({
          M: "Tìm kiếm thành công",
          D: results,
        });
      } else {
        console.log("Không tìm nhân viên có mã cửa hàng: ", macuahang);
        res.status(404).json({
          M: "Không tìm thấy",
          E: "Không tìm nhân viên có mã cửa hàng: " + macuahang,
        });
      }
    })
    .catch((error) => {
      console.error("Lỗi tìm kiếm:", error);
      res.status(500).json({ M: "Lỗi tìm kiếm", E: error });
    });
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
    .then((data) => {
      console.log("Thêm dữ liệu thành công");
      res.status(201).json({
        M: "Thêm dữ liệu thành công",
        D: data,
      });
    })
    .catch((error) => {
      console.error("Thêm dữ liệu thất bại");
      res.status(500).json({ M: "Thêm dữ liệu thất bại", E: error });
    });
});

module.exports = router;

var express = require("express");
const db = require("../models/database");
const NguoiLam = require("../models/NguoiLam");

var router = express.Router();

/* GET nguoi lam. */
router.get("/tatca", function (req, res, next) {
  NguoiLam.findAll()
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => console.log(err));
});

/* GET người làm bằng sdt. */
router.get("/timkiem/:sdt", function (req, res, next) {
  const sdt = req.params.sdt;

  NguoiLam.findOne({
    where: { sdt: sdt },
  })
    .then((nguoilam) => {
      if (nguoilam) {
        console.log("Tìm kiếm thành công:", nguoilam);
        res.status(200).json(nguoilam);
      } else {
        console.log("Không tìm thấy nhân viên với số điện thoại:", sdt);
        res.status(404).json({ error: "Không tìm thấy nhân viên" });
      }
    })
    .catch((error) => {
      console.error("Lỗi tìm kiếm:", error);
      res.status(500).json({ error: "Lỗi tìm kiếm" });
    });
});

/* POST thêm người làm. */
router.post("/themnguoilam", function (req, res, next) {
  const { hoten, diachi, sdt, email, ngaysinh, gioitinh, anhdaidien } =
    req.body;

  NguoiLam.create({
    hoten: hoten,
    diachi: diachi,
    sdt: sdt,
    email: email,
    ngaysinh: ngaysinh,
    gioitinh: gioitinh,
    anhdaidien: anhdaidien,
  })
    .then((nguoilam) => {
      console.log("Thêm dữ liệu thành công:", nguoilam);
      res.status(201).json(nguoilam); // Trả về dữ liệu đã tạo thành công
    })
    .catch((error) => {
      console.error("Thêm dữ liệu thất bại:", error);
      res.status(500).json({ error: "Thêm dữ liệu thất bại" }); // Trả về lỗi nếu có
    });
});

module.exports = router;

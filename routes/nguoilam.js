var express = require("express");
const db = require("../models/database");
const CuaHang = require("../models/NguoiLam");

var router = express.Router();
/* GET nguoi lam. */
router.get("/tatca", function (req, res, next) {
  CuaHang.findAll()
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => console.log(err));
});
/* POST thêm người làm. */
router.post("/themnguoilam", function (req, res, next) {
  const { hoten, diachi, sdt, email, ngaysinh, gioitinh, anhdaidien } =
    req.body;

  CuaHang.create({
    hoten: hoten,
    diachi: diachi,
    sdt: sdt,
    email: email,
    ngaysinh: ngaysinh,
    gioitinh: gioitinh,
    anhdaidien: anhdaidien,
  })
    .then((cuahang) => {
      console.log("Thêm dữ liệu thành công:", cuahang);
      res.status(201).json(cuahang); // Trả về dữ liệu đã tạo thành công
    })
    .catch((error) => {
      console.error("Thêm dữ liệu thất bại:", error);
      res.status(500).json({ error: "Thêm dữ liệu thất bại" }); // Trả về lỗi nếu có
    });
});
module.exports = router;

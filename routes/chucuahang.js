var express = require("express");
const { Op, where } = require("sequelize");
const db = require("../models/database");
const ChuCuaHang = require("../models/ChuCuaHang");
const NguoiLam = require("../models/NguoiLam");
const YeuCau = require("../models/YeuCauLamViec");

var router = express.Router();
/* GET tat ca chu cua hang. */
router.get("/tatca", function (req, res, next) {
  ChuCuaHang.findAll()
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => console.log(err));
});

/* GET tất cả yêu cầu */
router.get("/yeucau", function (req, res, next) {
  YeuCau.findAll({
    where: {
      trangthai: "yeucau",
    },
  })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => console.log(err));
});

/* GET tất cả đề nghị */
router.get("/denghi", function (req, res, next) {
  YeuCau.findAll({
    where: {
      trangthai: "denghi",
    },
  })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => console.log(err));
});

/* POST them chu cua hang. */
router.post("/themchucuahang", function (req, res, next) {
  const { hoten, diachi, sdt, email, gioitinh, anhdaidien } = req.body;

  ChuCuaHang.create({
    hoten: hoten,
    diachi: diachi,
    sdt: sdt,
    email: email,
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
/* POST gửi đề nghị */
router.post("/guidenghi", function (req, res, next) {
  const { macuahang, manl } = req.body;
  const yeucau_lamviec = YeuCau.findAll({
    where: {
      trangthai: "lamviec",
    },
  })
    .then((data) => {
      console.log("Tìm dữ liệu thành công:", data);
      //lấy mã người làm đã làm việc tại cấc cửa hàng
      const id_nguoilam = data.map((item) => item.manl);
      const trangthai = "denghi";
      if (!id_nguoilam.includes(manl)) {
        //nếu người làm đang yêu cầu và chủ cửa hàng đề nghị thị chuyển sang làm việc
        //ngược lại thêm một yêu cầulamf việc mới với trangthai denghi

        YeuCau.findOne({
          where: {
            trangthai: "yeucau",
            macuahang: macuahang,
            manl: manl,
          },
        })
          .then((newdata) => {
            console.log("Yeu cau trung: ", newdata);
            if (newdata) {
              //huy các yêu cầu khác của người làm
              YeuCau.update({ trangthai: "huy" }, { where: { manl: manl } });
              //cập nhật lại yêu cầu trùng với đề nghị
              YeuCau.update(
                { trangthai: "lamviec" },
                { where: { id: newdata.id } }
              );
              console.log("Cập nhật thành công");
              res.status(201).json(data); // Trả về dữ liệu đã tạo thành công
            } else {
              //tạo mới đề nghị
              YeuCau.create({
                macuahang: macuahang,
                manl: manl,
                trangthai: trangthai,
              })
                .then((data) => {
                  console.log("Thêm dữ liệu thành công:", data);
                  res.status(201).json(data); // Trả về dữ liệu đã tạo thành công
                })
                .catch((error) => {
                  console.error("Thêm dữ liệu thất bại:", error);
                  res.status(500).json({ error: "Thêm dữ liệu thất bại" }); // Trả về lỗi nếu có
                });
            }
          })
          .catch((error) => {
            console.error("Thêm dữ liệu thất bại:", error);
            res.status(500).json({ error: "Thêm dữ liệu thất bại" }); // Trả về lỗi nếu có
          });
      } else {
        console.log("Nhân viên đang làm việc tại cửa hàng");
        res.status(403).json(data); // Người làm đã làm việc
      }
    })
    .catch((error) => {
      console.error("Tìm dữ liệu thất bại:", error);
      res.status(500).json({ error: "Tìm dữ liệu thất bại" }); // Trả về lỗi nếu có
    });
});

/* POST chấp nhận yêu cầu. */
router.post("/chapnhanyeucau/:mayeucau", function (req, res, next) {
  const mayeucau = req.params.mayeucau;

  YeuCau.update({ trangthai: "lamviec" }, { where: { id: mayeucau } })
    .then((data) => {
      console.log("Thêm dữ liệu thành công:", data);
      res.status(201).json(data); // Trả về dữ liệu đã tạo thành công
    })
    .catch((error) => {
      console.error("Thêm dữ liệu thất bại:", error);
      res.status(500).json({ error: "Thêm dữ liệu thất bại" }); // Trả về lỗi nếu có
    });
});

module.exports = router;

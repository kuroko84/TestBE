var express = require("express");
const db = require("../models/database");
const NguoiLam = require("../models/NguoiLam");
const YeuCau = require("../models/YeuCauLamViec");
const CuaHang = require("../models/CuaHang");
const { Op } = require("sequelize");

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

/* Get đề nghị theo manl*/
router.get("/denghi/:manl", function (req, res, next) {
  const manl = req.params.manl;
  YeuCau.findAll({
    where: {
      trangthai: "denghi",
      manl: manl,
    },
  })
    .then((data) => {
      console.log("Thêm dữ liệu thành công:", data);
      res.status(201).json(data); // Tìm tạo thành công
    })
    .catch((error) => {
      console.error("Thêm dữ liệu thất bại:", error);
      res.status(500).json({ error: "Thêm dữ liệu thất bại" }); // Trả về lỗi nếu có
    });
});

/* POST chấp nhận đề nghị*/
router.post("/chapnhandenghi", function (req, res, next) {
  //phản hồi
  //phanhoi = 1 nếu chấp nhận đề nghị
  //phanhoi = 0 nế từ chói đề nghị
  const { mayeucau, phanhoi } = req.body;
  if (phanhoi) {
    YeuCau.findOne({
      where: { id: mayeucau },
    })
      .then((data) => {
        YeuCau.update({ trangthai: "huy" }, { where: { manl: data.manl } });
        //cập nhật lại yêu cầu trùng với đề nghị
        YeuCau.update({ trangthai: "lamviec" }, { where: { id: mayeucau } })
          .then((data) => {
            console.log("Đã chấp nhận đề nghị", data);
            res.status(201).json(data); // Trả về dữ liệu đã tạo thành công
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Thêm dữ liệu thất bại" }); // Trả về lỗi nếu có);
          });
      })
      .catch((error) => {
        console.error("Thêm dữ liệu thất bại:", error);
        res.status(500).json({ error: "Thêm dữ liệu thất bại" }); // Trả về lỗi nếu có
      });
  } else {
    YeuCau.findOne({
      where: { id: mayeucau },
    })
      .then((data) => {
        YeuCau.update({ trangthai: "huy" }, { where: { manl: data.manl } });
        onsole.log("Đã huỷ đề nghị", data);
        res.status(201).json(data); // Cập nhật thành
      })
      .catch((error) => {
        console.error("Điều chỉnh dữ liệu thất bại:", error);
        res.status(500).json({ error: "Điều chỉnh dữ liệu thất bại" }); // Trả về lỗi nếu có
      });
  }
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

/* POST gửi yêu cầu làm việc  */
router.post("/guiyeucau", function (req, res, next) {
  const { macuahang, manl } = req.body;
  const trangthai = "yeucau";
  const tt1 = "yeucau";
  const tt2 = "denghi";
  const tt3 = "lamviec";
  //nếu đã tồn tại trong yêu cầu làm việc thì không thêm mới, ngược lại tạo mới 1 yêu cầu
  const yeucau = YeuCau.findOne({
    where: {
      [Op.or]: [{ trangthai: tt1 }, { trangthai: tt2 }, { trangthai: tt3 }],
      manl: manl,
      macuahang: macuahang,
    },
  })
    .then((data) => {
      console.log("Tìm dữ liệu thành công:", data);
      if (!data) {
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
      } else {
        console.log("Đã Tồn Tại");
        res.status(201).json(data); // Trả về dữ liệu đã tạo thành công
      }
    })
    .catch((error) => {
      console.error("Tìm dữ liệu thất bại:", error);
      res.status(500).json({ error: "Tìm dữ liệu thất bại" }); // Trả về lỗi nếu có
    });
});

module.exports = router;

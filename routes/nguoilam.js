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
      console.log("Tìm kiếm thành công");
      res.status(200).json({
        M: "Tìm kiếm thành công",
        D: data,
      });
    })
    .catch((error) => {
      console.log("Lỗi tìm kiếm");
      res.status(500).json({
        M: "Lỗi tìm kiếm",
        E: error,
      });
    });
});

/* GET người làm bằng sdt. */
router.get("/timkiem/:sdt", function (req, res, next) {
  const sdt = req.params.sdt;

  NguoiLam.findOne({
    where: { sdt: sdt },
  })
    .then((data) => {
      if (!data) {
        console.log("Tìm kiếm thành công");
        res.status(404).json({
          M: "Tìm kiếm thành công",
          E: "Không có người làm tự do",
        });
      } else {
        console.log("Tìm kiếm thành công");
        res.status(200).json({
          M: "Tìm kiếm thành công",
          D: data,
        });
      }
    })
    .catch((error) => {
      console.log("Lỗi tìm kiếm");
      res.status(500).json({
        M: "Lỗi tìm kiếm",
        E: error,
      });
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
      console.log("Tìm kiếm thành công");
      res.status(200).json({
        M: "Tìm kiếm thành công",
        D: data,
      });
    })
    .catch((error) => {
      console.log("Lỗi tìm kiếm");
      res.status(500).json({
        M: "Lỗi tìm kiếm",
        E: error,
      });
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
            console.log("Đã chấp nhận đề nghị");
            res.status(201).json({ M: "Đã chấp nhận đề nghị", D: data }); // Trả về dữ liệu đã tạo thành công
          })
          .catch((error) => {
            console.log("Cập nhật dữ liệu thất bại");
            res.status(500).json({
              M: "Cập nhật dữ liệu thất bại",
              E: error,
            });
          });
      })
      .catch((error) => {
        console.log("Cập nhật dữ liệu thất bại");
        res.status(500).json({
          M: "Cập nhật dữ liệu thất bại",
          E: error,
        });
      });
  } else {
    YeuCau.findOne({
      where: { id: mayeucau },
    })
      .then((data) => {
        //cập nhật lại yêu cầu trùng với đề nghị
        YeuCau.update({ trangthai: "huy" }, { where: { id: mayeucau } })
          .then((newdata) => {
            console.log("Đã huỷ đề nghị");
            res.status(201).json({ M: "Đã huỷ đề nghị", D: newdata }); // Trả về dữ liệu đã tạo thành công
          })
          .catch((error) => {
            console.log("Cập nhật dữ liệu thất bại");
            res.status(500).json({
              M: "Cập nhật dữ liệu thất bại",
              E: error,
            });
          });
      })
      .catch((error) => {
        console.log("Cập nhật dữ liệu thất bại");
        res.status(500).json({
          M: "Cập nhật dữ liệu thất bại",
          E: error,
        });
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
    .then((data) => {
      console.log("Thêm dữ liệu thành công");
      res.status(201).json({
        M: "Thêm dữ liệu thành công",
        D: data,
      });
    })
    .catch((error) => {
      console.log("Thêm dữ liệu thất bại");
      res.status(500).json({
        M: "Thêm dữ liệu thất bại",
        E: error,
      });
    });
});

/* POST gửi yêu cầu làm việc  */
router.post("/guiyeucau", function (req, res, next) {
  const { macuahang, manl } = req.body;
  const trangthai = "yeucau";
  const tt1 = "yeucau";
  const tt2 = "denghi";
  const tt3 = "lamviec";
  const tt4 = "huy";
  //nếu đã tồn tại trong yêu cầu làm việc thì không thêm mới, ngược lại tạo mới 1 yêu cầu
  YeuCau.findAll({
    where: {
      [Op.or]: [{ trangthai: tt1 }, { trangthai: tt2 }, { trangthai: tt3 }],
      manl: manl,
    },
  })
    .then((data) => {
      console.log("Tìm dữ liệu thành công:", data);
      if (data == "") {
        YeuCau.create({
          macuahang: macuahang,
          manl: manl,
          trangthai: trangthai,
        })
          .then((data) => {
            console.log("Thêm dữ liệu thành công");
            res.status(201).json({
              M: "Thêm dữ liệu thành công",
              D: data,
            });
          })
          .catch((error) => {
            console.log("Thêm dữ liệu thất bại");
            res.status(500).json({
              M: "Thêm dữ liệu thất bại",
              E: error,
            });
          });
      } else {
        console.log("Đã tồn tại");
        res.status(201).json({
          M: "Đã tồn tại",
          D: data,
        });
      }
    })
    .catch((error) => {
      console.error("Tìm dữ liệu thất bại");
      res.status(500).json({
        M: "Tìm dữ liệu thất bại",
        E: error,
      });
    });
});

module.exports = router;

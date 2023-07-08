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

/* GET tất cả yêu cầu */
router.get("/yeucau", function (req, res, next) {
  YeuCau.findAll({
    where: {
      trangthai: "yeucau",
    },
  })
    .then((data) => {
      console.log("Tìm kiếm thành công");
      if (data == "") {
        res.status(200).json({
          M: "Không có yêu cầu nào",
          D: data,
        });
      } else {
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

/* GET tất cả yêu cầu làm việc */
router.get("/tatcayeucaulamviec", function (req, res, next) {
  YeuCau.findAll()
    .then((data) => {
      console.log("Tìm kiếm thành công");
      res.status(200).json({
        M: "Tìm kiếm thành công",
        D: data,
      });
    })
    .catch((error) => {
      console.error("Tìm kiếm dữ liệu thất bại");
      res.status(500).json({ M: "Tìm kiếm dữ liệu thất bại", E: error });
    });
});

/* GET tất cả đề nghị */
router.get("/denghi", function (req, res, next) {
  YeuCau.findAll({
    where: {
      trangthai: "denghi",
    },
  })
    .then((data) => {
      console.log("Tìm kiếm thành công");
      if (data == "") {
        res.status(200).json({
          M: "Không có đề nghị nào nào",
          D: data,
        });
      } else {
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

/* POST them chu cua hang. */
router.post("/themchucuahang", function (req, res, next) {
  const { hoten, ngaysinh, diachi, sdt, email, gioitinh, anhdaidien } =
    req.body;

  ChuCuaHang.create({
    hoten: hoten,
    ngaysinh: ngaysinh,
    diachi: diachi,
    sdt: sdt,
    email: email,
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
/* POST gửi đề nghị */
router.post("/guidenghi", function (req, res, next) {
  const { macuahang, manl } = req.body;
  const yeucau_lamviec = YeuCau.findAll({
    where: {
      trangthai: "lamviec",
    },
  })
    .then((data) => {
      console.log("Tìm người làm đang làm việc thành công:", data);
      //lấy mã người làm đã làm việc tại các cửa hàng
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
              console.log("Thêm dữ liệu thành công");
              res.status(201).json({
                M: "Thêm dữ liệu thành công",
                D: newdata,
              });
            } else {
              //tạo mới đề nghị
              YeuCau.create({
                macuahang: macuahang,
                manl: manl,
                trangthai: trangthai,
              })
                .then((newdata) => {
                  console.log("Thêm dữ liệu thành công");
                  res.status(201).json({
                    M: "Thêm dữ liệu thành công",
                    D: newdata,
                  });
                })
                .catch((error) => {
                  console.log("Thêm dữ liệu thất bại");
                  res.status(500).json({
                    M: "Thêm dữ liệu thất bại",
                    E: error,
                  });
                });
            }
          })
          .catch((error) => {
            console.error("Thêm dữ liệu thất bại:", error);
            res.status(500).json({ error: "Thêm dữ liệu thất bại" }); // Trả về lỗi nếu có
          });
      } else {
        console.log("Nhân viên đang làm việc tại cửa hàng");
        res.status(403).json({
          M: "Nhân viên đang làm việc tại cửa hàng",
          E: "Nhân viên đang làm việc",
        }); // Người làm đã làm việc
      }
    })
    .catch((error) => {
      console.log("Thêm dữ liệu thất bại");
      res.status(500).json({
        M: "Thêm dữ liệu thất bại",
        E: error,
      });
    });
});

/* POST phản hồi yêu cầu. */
router.post("/phanhoi", function (req, res, next) {
  //phản hồi :
  //phanhoi = 1 nếu chấp nhận yêu cầu
  //phanhoi = 0 nếu từ chối yêu cầu
  const { mayeucau, phanhoi } = req.body;
  if (phanhoi) {
    YeuCau.update({ trangthai: "lamviec" }, { where: { id: mayeucau } })
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
    YeuCau.update({ trangthai: "huy" }, { where: { id: mayeucau } })
      .then((data) => {
        console.log("Cập nhật dữ liệu thành công");
        res.status(201).json({
          M: "Cập nhật dữ liệu thành công",
          D: data,
        });
      })
      .catch((error) => {
        console.log("Cập nhật dữ liệu thất bại");
        res.status(500).json({
          M: "Cập nhât dữ liệu thất bại",
          E: error,
        });
      });
  }
});

/* POST chấm dứt hợp đồng */
router.post("/chamduthopdong", function (req, res, next) {
  const { manl } = req.body;
  YeuCau.findOne({
    where: {
      manl: manl,
      trangthai: "lamviec",
    },
  })
    .then((data) => {
      if (data) {
        trangthainl = data.trangthai;
      } else {
        trangthainl = 0;
      }

      if (trangthainl == "lamviec") {
        YeuCau.update({ trangthai: "huy" }, { where: { manl: manl } })
          .then((data) => {
            console.log("Cập nhật dữ liệu thành công");
            res.status(201).json({
              M: "Cập nhật dữ liệu thành công",
              D: data,
            });
          })
          .catch((error) => {
            console.log("Cập nhật dữ liệu thất bại");
            res.status(500).json({
              M: "Cập nhât dữ liệu thất bại",
              E: error,
            });
          });
      } else {
        console.log("Nhân viên chưa có việc làm");
        res.status(404).json({
          M: "Nhân viên chưa có việc làm",
          E: "Cập nhật dữ liệu không thành công",
        });
      }
    })
    .catch((error) => {
      console.log("Cập nhật dữ liệu thất bại");
      res.status(500).json({
        M: "Cập nhât dữ liệu thất bại",
        E: error,
      });
    });
});

module.exports = router;

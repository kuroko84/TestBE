var express = require("express");
const bcrypt = require("bcrypt");

var router = express.Router();
const ChuCuaHang = require("../models/ChuCuaHang");
const NguoiLam = require("../models/NguoiLam");
const DangNhap = require("../models/ThongTinDangNhap");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

var router = express.Router();

/* POST đăng ký. */
router.post("/dangky", function (req, res, next) {
  /* Vai Trò : vaitro=0 nếu là chủ cửa hàng, vaitro=1 nếu là người làm tự do*/
  /* trangthai = 0 khi vừa tạo, trangthai = 1 sau khi xác nhận email */

  const {
    vaitro,
    hoten,
    ngaysinh,
    diachi,
    sdt,
    email,
    gioitinh,
    anhdaidien,
    pass,
  } = req.body;
  var hashpass;
  const plaintextPassword = pass;

  // Số vòng lặp (tùy chọn), càng cao thì quá trình hash càng lâu và an toàn hơn
  const saltRounds = 5;

  bcrypt.hash(plaintextPassword, saltRounds, function (err, hash) {
    if (err) {
      console.error("Lỗi khi hash password:", err);
      return;
    }

    // Hash password thành công
    hashpass = hash;
    DangNhap.create({
      email: email,
      sdt: sdt,
      pass: hashpass,
      trangthai: "0",
    })
      .then((data) => {
        console.log("Tạo mới thông tin đăng nhập thành công:", data);
      })
      .catch((error) => {
        console.error("Thêm dữ liệu thất bại:", error);
      });
    if (!vaitro) {
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
          console.log("Tạo mới chủ cửa hàng thành công:", data);
          res.status(201).json(data); // Trả về dữ liệu đã tạo thành công
        })
        .catch((error) => {
          console.error("Thêm dữ liệu thất bại:", error);
          res.status(500).json({ error: "Thêm dữ liệu thất bại" }); // Trả về lỗi nếu có
        });
    } else {
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
    }
  });
});
/* POST đăng nhập bằng email*/
router.post("/dangnhap_email", function (req, res, next) {
  const { email, pass } = req.body;
  console.log(email, pass);
  DangNhap.findOne({
    where: { email: email },
  })
    .then((data) => {
      if (data.trangthai == 1) {
        const hashedPassword = data.pass;

        const plaintextPassword = pass;

        bcrypt.compare(
          plaintextPassword,
          hashedPassword,
          function (err, result) {
            if (err) {
              console.error("Lỗi khi so sánh password:", err);
              return;
            }

            if (result) {
              console.log("Password khớp");
            } else {
              console.log("Password không khớp");
            }
            console.log("Đăng nhập thành công:", pass, hashedPassword);
            res.status(201).json(data); // Trả về dữ liệu đã tạo thành công
          }
        );
      } else {
        console.log("Email chưa xác thực:");
        res.status(201).json(data); // Trả về dữ liệu đã tạo thành công
      }
    })
    .catch((error) => {
      console.error("Xác thực lỗi:", error);
      res.status(500).json({ error: "Lỗi xác thực" }); // Trả về lỗi nếu có
    });
});

/* POST đăng nhập bằng sdt*/
router.post("/dangnhap_sdt", function (req, res, next) {
  const { sdt, pass } = req.body;
  console.log(sdt, pass);
  DangNhap.findOne({
    where: { sdt: sdt },
  })
    .then((data) => {
      if (data.trangthai == 1) {
        const hashedPassword = data.pass;

        const plaintextPassword = pass;

        bcrypt.compare(
          plaintextPassword,
          hashedPassword,
          function (err, result) {
            if (err) {
              console.error("Lỗi khi so sánh password:", err);
              return;
            }

            if (result) {
              console.log("Password khớp");
            } else {
              console.log("Password không khớp");
            }
            console.log("Đăng nhập thành công:", pass, hashedPassword);
            res.status(201).json(data); // Trả về dữ liệu đã tạo thành công
          }
        );
      } else {
        console.log("Email chưa xác thực:");
        res.status(201).json(data); // Trả về dữ liệu đã tạo thành công
      }
    })
    .catch((error) => {
      console.error("Xác thực lỗi:", error);
      res.status(500).json({ error: "Lỗi xác thực" }); // Trả về lỗi nếu có
    });
});

/* PUT xác thực */
router.put("/xacthuc/:email", function (req, res, next) {
  const email = req.params.email;
  console.log(email);
  DangNhap.update({ trangthai: "1" }, { where: { email: email } })
    .then((data) => {
      console.log("Xác thực thành công:", data);
      res.status(201).json(data); // Trả về dữ liệu đã tạo thành công
    })
    .catch((error) => {
      console.error("Xác thực lỗi:", error);
      res.status(500).json({ error: "Lỗi xác thực" }); // Trả về lỗi nếu có
    });
});

module.exports = router;

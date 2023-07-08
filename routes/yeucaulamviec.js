var express = require("express");
const db = require("../models/database");
const YeuCau = require("../models/YeuCauLamViec");

var router = express.Router();
/* GET tất cả yêu cầu việc làm */
router.get("/tatca", function (req, res, next) {
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

/* GET  */

module.exports = router;

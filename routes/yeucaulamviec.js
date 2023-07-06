var express = require("express");
const db = require("../models/database");
const YeuCau = require("../models/YeuCauLamViec");

var router = express.Router();
/* GET tất cả yêu cầu việc làm */
router.get("/tatca", function (req, res, next) {
  YeuCau.findAll()
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => console.log(err));
});
module.exports = router;

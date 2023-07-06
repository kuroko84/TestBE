var express = require("express");
const db = require("../models/database");
const CuaHang = require("../models/ChuCuaHang");

var router = express.Router();
/* GET chucuahang. */
router.get("/tatca", function (req, res, next) {
  CuaHang.findAll()
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => console.log(err));
});

module.exports = router;

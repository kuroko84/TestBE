const Sequelize = require("sequelize");
const db = require("./database");

const NguoiLam = db.define("thongtindangnhap", {
  email: Sequelize.STRING,
  sdt: Sequelize.STRING,
  pass: Sequelize.STRING,
  trangthai: Sequelize.BOOLEAN,
});

module.exports = NguoiLam;

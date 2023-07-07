const Sequelize = require("sequelize");
const db = require("./database");

const ChuCuaHang = db.define("chucuahang", {
  hoten: Sequelize.STRING,
  ngaysinh: Sequelize.DATE,
  diachi: Sequelize.STRING,
  sdt: Sequelize.STRING,
  email: Sequelize.STRING,
  gioitinh: Sequelize.BOOLEAN,
  anhdaidien: Sequelize.STRING,
});

module.exports = ChuCuaHang;

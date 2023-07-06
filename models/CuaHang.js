const Sequelize = require("sequelize");
const db = require("./database");

const CuaHang = db.define("cuahang", {
  macch: Sequelize.INTEGER,
  tencuahang: Sequelize.STRING,
  tencuahang: Sequelize.STRING,
  diachi: Sequelize.STRING,
  sdt: Sequelize.STRING,
  email: Sequelize.STRING,
  anhlogo: Sequelize.STRING,
});

module.exports = CuaHang;

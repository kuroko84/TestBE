const Sequelize = require("sequelize");
const db = require("./database");
const ChuCuaHang = require("./ChuCuaHang");

const CuaHang = db.define("cuahang", {
  macch: Sequelize.INTEGER,
  tencuahang: Sequelize.STRING,
  tencuahang: Sequelize.STRING,
  diachi: Sequelize.STRING,
  sdt: Sequelize.STRING,
  email: Sequelize.STRING,
  anhlogo: Sequelize.STRING,
});

ChuCuaHang.hasMany(CuaHang, { foreignKey: "macch" });
CuaHang.belongsTo(ChuCuaHang, { foreignKey: "macch" });

module.exports = CuaHang;

const Sequelize = require("sequelize");
const db = require("./database");

const YeuCauViecLam = db.define("yeucaulamviec", {
  macuahang: Sequelize.INTEGER,
  manl: Sequelize.INTEGER,
  trangthai: Sequelize.STRING,
});

module.exports = YeuCauViecLam;

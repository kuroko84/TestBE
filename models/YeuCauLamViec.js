const Sequelize = require("sequelize");
const db = require("./database");

const YeuCauViecLam = db.define("yeucaulamviec", {
  macuahang: Sequelize.STRING,
  manl: Sequelize.DATE,
  trangthai: Sequelize.BOOLEAN,
});

module.exports = YeuCauViecLam;

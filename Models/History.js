const sequelize = require("../database");
const Sequelize = require("sequelize");

const History = sequelize.define("history", {
  slippiname: {
    type: Sequelize.STRING,
    unique: false,
  },
  slippielo: {
    type: Sequelize.INTEGER,
    unique: false,
  },
  date: {
    type: Sequelize.DATE,
    unique: true,
  },
});

module.exports = History;

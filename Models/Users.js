const sequelize = require("../database");
const Sequelize = require("sequelize");

const Users = sequelize.define("users", {
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  userid: {
    type: Sequelize.STRING,
    unique: true,
  },
  slippiname: {
    type: Sequelize.STRING,
    unique: true,
  },
  slippielo: {
    type: Sequelize.INTEGER,
    unique: false,
  },
  slippiglobalplacement: {
    type: Sequelize.INTEGER,
    unique: false,
  },
});

module.exports = Users;

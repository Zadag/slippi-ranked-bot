const sequelize = require("../database");
const Sequelize = require("sequelize");

const Characters = sequelize.define("characters", {
  slippiname: {
    type: Sequelize.STRING,
    unique: true,
  },
  DR_MARIO: {
    type: Sequelize.INTEGER,
  },
  DONKEY_KONG: {
    type: Sequelize.INTEGER,
  },
  MARIO: {
    type: Sequelize.INTEGER,
  },
  LUIGI: {
    type: Sequelize.INTEGER,
  },
  PEACH: {
    type: Sequelize.INTEGER,
  },
  BOWSER: {
    type: Sequelize.INTEGER,
  },
  YOSHI: {
    type: Sequelize.INTEGER,
  },
  CAPTAIN_FALCON: {
    type: Sequelize.INTEGER,
  },
  NESS: {
    type: Sequelize.INTEGER,
  },
  YOUNG_LINK: {
    type: Sequelize.INTEGER,
  },
  LINK: {
    type: Sequelize.INTEGER,
  },
  FOX: {
    type: Sequelize.INTEGER,
  },
  FALCO: {
    type: Sequelize.INTEGER,
  },
  MARTH: {
    type: Sequelize.INTEGER,
  },
  ROY: {
    type: Sequelize.INTEGER,
  },
  PIKACHU: {
    type: Sequelize.INTEGER,
  },
  PICHU: {
    type: Sequelize.INTEGER,
  },
  MR_GAME_AND_WATCH: {
    type: Sequelize.INTEGER,
  },
  GANONDORF: {
    type: Sequelize.INTEGER,
  },
  SAMUS: {
    type: Sequelize.INTEGER,
  },
  ZELDA: {
    type: Sequelize.INTEGER,
  },
  MEWTWO: {
    type: Sequelize.INTEGER,
  },
  SHEIK: {
    type: Sequelize.INTEGER,
  },
  ICE_CLIMBERS: {
    type: Sequelize.INTEGER,
  },
  KIRBY: {
    type: Sequelize.INTEGER,
  },
  JIGGLYPUFF: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Characters;

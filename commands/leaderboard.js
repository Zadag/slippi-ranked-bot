const { SlashCommandBuilder, Embed, EmbedBuilder } = require("discord.js");
const Users = require("../Models/Users");
const Characters = require("../Models/Characters");
const ratingToRanks = require("../ratingToRanks");
const Canvas = require("@napi-rs/canvas");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test_leaderboard")
    .setDescription("Show the docs leaderboard"),
  async execute(interaction) {
    const users = await Users.findAll();
    const ladder = [];
    for (const user of users) {
      const slippiName = user.get("slippiname");
      console.log(slippiName, "SlippiName in leaderboard");
      const characters = await Characters.findOne({
        where: { slippiname: slippiName },
      });
      console.log(characters.dataValues, "Characters in leaderboard");
      console.log(typeof characters.dataValues);
      let maxValue = 0;
      let maxProp;
      for (const prop in characters.dataValues) {
        if (
          characters.dataValues[prop] !== null &&
          characters.dataValues[prop] > maxValue &&
          prop !== "id"
        ) {
          maxValue = characters.dataValues;
          maxProp = prop;
        }
      }
      console.log(maxProp);
      if (maxProp === "DR_MARIO") {
        ladder.push({
          user: user.get("username"),
          elo: user.get("slippielo"),
          globalPlacement: user.get("slippiglobalplacement"),
          rank: ratingToRanks(
            user.get("slippielo"),
            user.get("slippiglobalplacement")
          ),
        });
      }
    }

    const sortedLadder = ladder.sort((a, b) => {
      return a.elo > b.elo ? -1 : 1;
    });

    const descString = sortedLadder.map((player, i) => {
      return `${i + 1}) ${player.user} : ${player.elo}`;
    });
    const joined = descString.join("\n");
    const embed = {
      color: 0x0099ff,
      title: "The Docs",
      description: joined,
    };

    return await interaction.reply({ embeds: [embed] });
  },
};

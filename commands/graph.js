const { SlashCommandBuilder } = require("discord.js");
const History = require("../Models/History");
const Users = require("../Models/Users");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("graph")
    .setDescription("graph a player's 7 day history")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("tag somebody to see their history")
        .setRequired(true)
    ),
  async execute(interaction) {
    const userName = interaction.options.getUser("user").username;
    const user = await Users.findOne({
      attributes: ["slippiname"],
      where: { username: userName },
    });

    const slippiName = user.dataValues.slippiname;

    console.log("here", user, slippiName);

    try {
      const datapoints = await History.findAll({
        attributes: ["slippielo", "date"],
        where: { slippiname: slippiName },
        order: [["date", "DESC"]],
        limit: 5,
      });
      if (datapoints) {
        console.log(datapoints);
        return await interaction.reply(
          `Success!  datapoints are ${
            (datapoints[0].dataValues.slippielo, datapoints[0].dataValues.date)
          } ${datapoints[1].dataValues.slippielo} ${
            datapoints[4].dataValues.slippielo
          }`
        );
      } else {
        return await interaction.reply(`${userName} is not registered`);
      }
    } catch (error) {
      console.error(error);
      if (error) {
        return await interaction.reply(`${userName} is not in the database`);
      }
    }
  },
};

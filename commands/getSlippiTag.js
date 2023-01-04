const { SlashCommandBuilder } = require("discord.js");
const sequelize = require("../database");
const Users = require("../Models/Users");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slippi_tag")
    .setDescription("Get somebody's slippi connect code.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("tag somebody to see their connect code")
        .setRequired(true)
    ),
  async execute(interaction) {
    const userName = interaction.options.getUser("user").username;

    try {
      const user = await Users.findOne({ where: { username: userName } });

      if (user) {
        return await interaction.reply(
          `${userName}'s connect code is ${user.get("slippiname")}`
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

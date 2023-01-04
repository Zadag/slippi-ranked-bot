const { SlashCommandBuilder } = require("discord.js");
const sequelize = require("../database");
const Users = require("../Models/Users");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unregister")
    .setDescription("Remove yourself from the DocBot"),
  async execute(interaction) {
    const userName = interaction.user.username;

    try {
      const user = await Users.destroy({ where: { username: userName } });

      if (user) {
        return await interaction.reply(
          `${userName} has been removed from the database`
        );
      }
    } catch (error) {
      console.error(error);
      if (error) {
        return await interaction.reply(`${userName} is not in the database`);
      }
    }
  },
};

const { SlashCommandBuilder } = require("discord.js");
const Users = require("../Models/Users");
const Characters = require("../Models/Characters");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unregister")
    .setDescription("Remove yourself from the DocBot"),
  async execute(interaction) {
    const userName = interaction.user.username;
    const target = await Users.findOne({
      where: { username: userName },
    });
    const slippiName = target.get("slippiname");
    console.log(slippiName);

    try {
      const user = await Users.destroy({ where: { username: userName } });
    } catch (error) {
      console.error(error);
      if (error) {
        return await interaction.reply(`${userName} is not in the database`);
      }
    }

    try {
      const characters = await Characters.destroy({
        where: { slippiname: slippiName },
      });

      return await interaction.reply(
        `${userName} has been removed from the database`
      );
    } catch (error) {
      console.error(error);
    }
  },
};

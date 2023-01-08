const { SlashCommandBuilder } = require("discord.js");
const sequelize = require("../database");
const Users = require("../Models/Users");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Registers user with the ranked bot.")
    .addStringOption((option) =>
      option
        .setName("slippi_tag")
        .setDescription("Your slippi tag (for example KB#965)")
        .setRequired(true)
    ),
  async execute(interaction) {
    const userName = interaction.user.username;
    const userId = interaction.user.id;
    const slippiName = interaction.options
      .getString("slippi_tag")
      .toUpperCase();

    try {
      // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
      console.log('registering', userName, userId, slippiName);
      const user = await Users.create({
        username: userName,
        userid: userId,
        slippiname: slippiName,
        slippielo: 0,
        slippiglobalplacement: null,
      });

      await interaction.reply(
        `${interaction.user.username} has registered with the bot.`
      );
    } catch (error) {
      console.error(error);
      if (error.errors[0].message === "userid must be unique") {
        return await interaction.reply("You are already registered!");
      }
      if (error.errors[0].message === "slippiname must be unique") {
        const tagowner = await Users.findOne({
          where: { slippiname: slippiName },
        });
        const taggable = tagowner.get("userid");
        return await interaction.reply(
          `That slippi name has already been registered by <@${taggable}>`
        );
      }
      console.error(error);
      await interaction.reply("Something went wrong with adding a tag.");
    }
  },
};

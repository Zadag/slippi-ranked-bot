const { SlashCommandBuilder } = require("discord.js");
const History = require("../Models/History");
const Users = require("../Models/Users");
const QuickChart = require("quickchart-js");

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
      const data = await History.findAll({
        attributes: ["slippielo", "date"],
        where: { slippiname: slippiName },
        order: [["date", "DESC"]],
        limit: 5,
      });
      if (data) {
        const datapoints = data.reduce(
          (acc, curr) => {
            acc.eloscores.push(curr.dataValues.slippielo);
            acc.dates.push(curr.dataValues.date.toString());
            return acc;
          },
          { eloscores: [], dates: [] }
        );
        chartConfig = {
          type: "line",
          data: {
            //labels: ["9th", "10th"],
            datasets: [
              {
                label: `${userName}`,
                data: datapoints.eloscores.map((elo) => elo),
              },
            ],
          },
        };
        const chart = new QuickChart();
        chart.setConfig(chartConfig);

        console.log(datapoints);
        return await interaction.reply(chart.getUrl());
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

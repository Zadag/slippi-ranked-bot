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
        limit: 84,
      });
      if (data) {
        const datapoints = data.reduce(
          (acc, curr) => {
            if (Object.keys(acc).length > 12 * 7) return acc;
            acc.eloscores.push(curr.dataValues.slippielo);
            acc.dates.push(curr.dataValues.date);
            return acc;
          },
          { eloscores: [], dates: [] }
        );
        const { eloscores, dates } = datapoints;
        const uniqueDates = dates
          .map((date) => date.getUTCDate())
          .map((date, index, arr) => {
            return arr.indexOf(date) === index ? date : "";
          });
        //.filter((date, index, arr) => arr.indexOf(date) === index);

        uniqueDates.reverse();
        eloscores.reverse();

        chartConfig = {
          type: "line",
          data: {
            labels: uniqueDates.map((date) => date),
            datasets: [
              {
                label: `${userName}`,
                data: eloscores.map((elo) => elo),
              },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  display: true,
                  ticks: {
                    suggestedMin: 3000,
                  },
                },
              ],
            },
          },
        };
        const chart = new QuickChart();
        chart.setConfig(chartConfig);

        console.log(uniqueDates, eloscores);
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

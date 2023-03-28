const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const ratingToRanks = require("../ratingToRanks");
const Users = require("../Models/Users");
const fetchPlayerData = require("../fetchPlayerData");
const Canvas = require("@napi-rs/canvas");
const path = require("node:path");
const rankImgPath = require("../rankImgPath");

const applyText = (canvas, text) => {
  const context = canvas.getContext("2d");

  // Declare a base size of the font
  let fontSize = 70;

  do {
    // Assign the font to the context and decrement it so it can be measured again
    context.font = `${(fontSize -= 10)}px sans-serif`;
    // Compare pixel width of the text to the canvas minus the approximate avatar size
  } while (context.measureText(text).width > canvas.width - 300);

  // Return the result to use in the actual canvas
  return context.font;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Replies with current ranked details")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("tag somebody to see their rank")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const userName = interaction.options.getUser("user").username;

    try {
      const user = await Users.findOne({ where: { username: userName } });

      if (user) {
        const slippiname = user.get("slippiname");
        const data = await fetchPlayerData(slippiname);
        if (data === "invalid connect code") {
          return await interaction.editReply(
            `${slippiname} is not a valid slippi name.`
          );
        }
        const { points, dailyGlobalPlacement, characters } = data;

        await Users.update(
          { slippielo: points },
          { where: { username: userName } }
        );
        await Users.update(
          { slippiglobalplacement: dailyGlobalPlacement },
          { where: { username: userName } }
        );
        console.log("here", points, dailyGlobalPlacement, characters);

        const rank = ratingToRanks(points, dailyGlobalPlacement);
        // Generate canvas
        const relPath = __dirname.substring(0, __dirname.lastIndexOf("/"));
        const resolvedPath = path.join(relPath, "assets");
        const canvas = Canvas.createCanvas(700, 250);
        const context = canvas.getContext("2d");
        const background = await Canvas.loadImage(
          path.join(resolvedPath, "darkbackground.jpg")
        );
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        context.strokeStyle = "#0099ff";
        context.strokeRect(0, 0, canvas.width, canvas.height);
        const rankImage = await Canvas.loadImage(
          path.join(
            resolvedPath,
            `${rankImgPath(ratingToRanks(points, dailyGlobalPlacement))}.png`
          )
        );
        context.drawImage(rankImage, 20, 20, 200, 200);
        context.font = applyText(
          canvas,
          `${userName}-${user.get("slippiname")}`
        );
        context.fillStyle = "#ffffff";
        context.fillText(
          `${userName}-${user.get("slippiname")}`,
          canvas.width / 2.5,
          canvas.height / 2.5
        );
        context.font = "40px sans-serif";
        context.fillStyle = "#ffffff";
        context.fillText(
          `${ratingToRanks(points, dailyGlobalPlacement)} ${points}`,
          canvas.width / 2.5,
          canvas.height / 1.5
        );
        const attachment = new AttachmentBuilder(await canvas.encode("png"), {
          name: "player-card.png",
        });
        return await interaction.editReply({ files: [attachment] });
      }
      if (!user) {
        return await interaction.editReply(
          `${interaction.options.getUser("user")} is not registered`
        );
      }
    } catch (error) {
      console.error(error);
      if (error) {
        return await interaction.editReply("Something went wrong :(");
      }
    }
  },
};

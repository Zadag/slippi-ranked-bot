// Initiate dotenv and grab token
require("dotenv").config();
// Require necessary classes
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const token = process.env.DISCORD_TOKEN;
const Sequelize = require("sequelize");
const Users = require("./Models/Users");
const Characters = require("./Models/Characters");
const updateDB = require("./updatedb");

// Initiate client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// Add a collection to the client instance.  A collection is essentially an extension of Map with some extra features
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith("js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[Warning] the command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  if (interaction.commandName === "register") {
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// Once loaded, do this once
client.once(Events.ClientReady, (c) => {
  Users.sync();
  Characters.sync();
  console.log(`Ready! Logged in as ${c.user.tag}`);
  setInterval(updateDB, 1000 * 60 * 120);
});

client.login(token);

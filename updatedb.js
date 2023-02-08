const Users = require("./Models/Users");
const Characters = require("./Models/Characters");
const fetchPlayerData = require("./fetchPlayerData");

const updateDB = async () => {
  const users = await Users.findAll();
  for (const user of users) {
    console.log(user.get("slippiname"));
    const slippiName = user.get("slippiname");

    // Update elo and global placement in Users
    const { points, dailyGlobalPlacement, characters } = await fetchPlayerData(
      user.get("slippiname")
    );
    console.log(
      "updating in updatedb",
      points,
      dailyGlobalPlacement,
      slippiName
    );
    if (!points)
      return console.log(`Skip update for ${slippiName} tag is undefined`);
    await Users.update(
      { slippielo: points },
      { where: { slippiname: slippiName } }
    );
    await Users.update(
      { slippiglobalplacement: dailyGlobalPlacement },
      { where: { slippiname: slippiName } }
    );

    // Update character usage in Characters
    const charactersModel = await Characters.findOne({
      where: { slippiname: slippiName },
    });

    if (!charactersModel) {
      await Characters.create({
        slippiname: slippiName,
      });
    }

    const charArray = [];
    characters.forEach((char) => {
      charArray.push(char);
    });
    console.log(charArray, "charArray");
    console.log(charactersModel, "charactersModel");
    charArray.forEach(async (char) => {
      const updateData = {};
      const character = char.character;
      const gameCount = char.gameCount;
      updateData[character] = gameCount;
      await Characters.update(updateData, {
        where: { slippiname: slippiName },
      });
    });
  }
  return console.log("elo updated");
};

module.exports = updateDB;

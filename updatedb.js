const Users = require('./Models/Users');
const fetchPlayerData = require('./fetchPlayerData');

const updateDB = async () => {
    const users = await Users.findAll();
    for (const user of users) {
        const {points, dailyGlobalPlacement, displayName} = fetchPlayerData(user.get('slippiname'));
        await Users.update(
            { slippielo: points },
            { where: { slippiname: displayName } }
          );
          await Users.update(
            { slippiglobalplacement: dailyGlobalPlacement },
            { where: { slippiname: displayName } }
          );
    }
    return console.log('elo updated');
}

module.exports = updateDB;

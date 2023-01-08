const Users = require('./Models/Users');
const fetchPlayerData = require('./fetchPlayerData');

const updateDB = async () => {
    const users = await Users.findAll();
    for (const user of users) {
        console.log(user.get('slippiname'))
        const {points, dailyGlobalPlacement, displayName} = await fetchPlayerData(user.get('slippiname'));
        console.log('updating', points, dailyGlobalPlacement, displayName);
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

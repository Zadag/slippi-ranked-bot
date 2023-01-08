const Users = require('./Models/Users');
const fetchPlayerData = require('./fetchPlayerData');

const updateDB = async () => {
    const users = await Users.findAll();
    for (const user of users) {
        console.log(user.get('slippiname'))
        const slippiName = user.get("slippiname");
        const {points, dailyGlobalPlacement} = await fetchPlayerData(user.get('slippiname'));
        console.log('updating', points, dailyGlobalPlacement, slippiName);
        await Users.update(
            { slippielo: points },
            { where: { slippiname: slippiName } }
          );
          await Users.update(
            { slippiglobalplacement: dailyGlobalPlacement },
            { where: { slippiname: slippiName } }
          );
    }
    return console.log('elo updated');
}

module.exports = updateDB;

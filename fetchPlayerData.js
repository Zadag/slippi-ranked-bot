const { fetch } = require("undici");
const { RateLimiter } = require("limiter");

const getPlayerData = async (connectCode) => {
  const query = `fragment userProfilePage on User {
    displayName
    connectCode {
          code
          __typename
        }
      rankedNetplayProfile {
            id
            ratingOrdinal
            ratingUpdateCount
            wins
            losses
            dailyGlobalPlacement
            dailyRegionalPlacement
            continent
            characters {
                    id
                    character
                    gameCount
                    __typename
                  }
            __typename
          }
      __typename
  }
  query AccountManagementPageQuery($cc: String!) {
      getConnectCode(code: $cc) {
            user {
                    ...userProfilePage
                    __typename
                  }
            __typename
          }
  }`;

  const req = await fetch(
    "https://gql-gateway-dot-slippi.uc.r.appspot.com/graphql",
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        operationName: "AccountManagementPageQuery",
        query,
        variables: { cc: connectCode },
      }),
      method: "POST",
    }
  );
  return req.json();
};

const limiter = new RateLimiter({ tokensPerInterval: 1, interval: 1000 });

const fetchPlayerData = async (connectCode) => {
  limiter.removeTokens(1);
  const data = await getPlayerData(connectCode);
  const stuff = await data;
  console.log(stuff);

  if (!stuff.data.getConnectCode) {
    return "invalid connect code";
  }

  const dailyGlobalPlacement = parseInt(
    stuff.data.getConnectCode.user.rankedNetplayProfile.dailyGlobalPlacement
  );
  const points = parseInt(
    stuff.data.getConnectCode.user.rankedNetplayProfile.ratingOrdinal
  );
  const displayName = stuff.data.getConnectCode.user.displayName;

  const characters =
    stuff.data.getConnectCode.user.rankedNetplayProfile.characters;

  return { points, dailyGlobalPlacement, displayName, characters };
};

module.exports = fetchPlayerData;

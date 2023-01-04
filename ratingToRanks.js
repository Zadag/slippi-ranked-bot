const ratingToRanks = (rating, dailyGlobalPlacement) => {
  if (dailyGlobalPlacement < 300 && dailyGlobalPlacement !== null)
    return "Grandmaster";
  if (rating < 765) return "Bronze 1";
  if (rating < 913) return "Bronze 2";
  if (rating < 1054) return "Bronze 3";
  if (rating < 1188) return "Silver 1";
  if (rating < 1315) return "Silver 2";
  if (rating < 1435) return "Silver 3";
  if (rating < 1548) return "Gold 1";
  if (rating < 1653) return "Gold 2";
  if (rating < 1751) return "Gold 3";
  if (rating < 1842) return "Platinum 1";
  if (rating < 1928) return "Platinum 2";
  if (rating < 2003) return "Platinum 3";
  if (rating < 2073) return "Diamond 1";
  if (rating < 2136) return "Diamond 2";
  if (rating < 2191) return "Diamond 3";
  if (rating < 2274) return "Master 1";
  if (rating < 2350) return "Master 2";
  if (rating >= 2350) return "Master 3";
};

module.exports = ratingToRanks;

const rankImgPath = (rank) => {
  if (rank === "Bronze 1") return "BronzeI";
  if (rank === "Bronze 2") return "BronzeII";
  if (rank === "Bronze 3") return "BronzeIII";
  if (rank === "Silver 1") return "SilverI";
  if (rank === "Silver 2") return "SilverII";
  if (rank === "Silver 3") return "SilverIII";
  if (rank === "Gold 1") return "GoldI";
  if (rank === "Gold 2") return "GoldII";
  if (rank === "Gold 3") return "GoldIII";
  if (rank === "Platinum 1") return "PlatinumII";
  if (rank === "Platinum 2") return "PlatinumII";
  if (rank === "Platinum 3") return "PlatinumIII";
  if (rank === "Diamond 1") return "DiamondI";
  if (rank === "Diamond 2") return "DiamondII";
  if (rank === "Diamond 3") return "DiamondIII";
  if (rank === "Master 1") return "MasterI";
  if (rank === "Master 2") return "MasterI";
  if (rank === "Master 3") return "MasterI";
  if (rank === "Grandmaster") return "Grandmaster";
};

module.exports = rankImgPath;

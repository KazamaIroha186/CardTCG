module.exports = (sequelize, DataTypes) => {
  const Cards = sequelize.define("Cards", {
      name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      image: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      rarity: {
          type: DataTypes.STRING,
          allowNull: false,
      },
  });

  return Cards;
};

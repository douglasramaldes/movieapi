const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { Movie } = require("./movie");

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    timestamps: true,
  }
);

const Watchlist = sequelize.define("Watchlist", {
  status: {
    type: DataTypes.ENUM("to_watch", "watched"),
    defaultValue: "to_watch",
  },
  interestCreatedAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
  statusUpdatedAt: { type: DataTypes.DATE, allowNull: true },
});

User.belongsToMany(Movie, { through: Watchlist });
Movie.belongsToMany(User, { through: Watchlist });

module.exports = { User, Watchlist };

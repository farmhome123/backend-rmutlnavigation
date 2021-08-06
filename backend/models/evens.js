const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const evens = sequelize.define(
  "evens",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "null",
    },
    buildingevens: {
      type: Sequelize.STRING,
      allowNull: false,
      
    },
    detailevens: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    urlgooglemap: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    // options
  }
);

(async () => {
  await evens.sync({ force: false });
})();

module.exports = evens;

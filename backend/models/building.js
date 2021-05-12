const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const building = sequelize.define(
    "building",
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "-"
        },
        buildinglatitude: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        buildinglongitude: {
            type: Sequelize.FLOAT,
            allowNull: false
        }

    },
    {
        // options
    }
);


(async () => {
    await building.sync({ force: false });
})();


module.exports = building;

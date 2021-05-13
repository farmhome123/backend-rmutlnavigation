const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const classroom = sequelize.define(
    "classroom",
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
        detailclass: {
            type: Sequelize.STRING,
            allowNull: false
        },
        floot: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        buildingid: {
            type: Sequelize.INTEGER,
            allowNull: false
        }

    },
    {
        // options
    }
);

(async () => {
    await classroom.sync({ force: false });
})();


module.exports = classroom;

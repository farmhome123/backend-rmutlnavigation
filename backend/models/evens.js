const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const evens = sequelize.define(
    "evens",
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
        buildingevens: {
            type: Sequelize.STRING,
            allowNull: false
        },
        detailevens: {
            type: Sequelize.STRING,
            allowNull: false
        },
        evenslatitude: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        evenslongitude: {
            type: Sequelize.FLOAT,
            allowNull: false
        }

    },
    {
        // options
    }
);


(async () => {
    await evens.sync({ force: false });
})();


module.exports = evens;

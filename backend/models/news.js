const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const news = sequelize.define(
    "news",
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
        detailnews: {
            type: Sequelize.STRING,
            allowNull: false
        }

    },
    {
        // options
    }
);


(async () => {
    await news.sync({ force: false });
})();


module.exports = news;

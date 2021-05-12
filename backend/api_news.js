const express = require("express");
const router = express.Router();
const news = require("./models/news");
const Sequelize = require("sequelize");
const constants = require("./constant");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");
const Op = Sequelize.Op;

// Upload Image news
uploadImageNews = async (files, doc) => {
    if (files.image != null) {
        var fileExtention = files.image.name.split(".")[1];
        doc.image = `news${doc.id}.${fileExtention}`;
        var newpath =
            path.resolve(__dirname + "/uploaded/images/") + "/" + doc.image;
        if (fs.exists(newpath)) {
            await fs.remove(newpath);
        }
        await fs.moveSync(files.image.path, newpath);

        // Update database
        let result = news.update(
            { image: doc.image },
            { where: { id: doc.id } }
        );
        return result;
    }
};

// Get news
router.get("/news", async (req, res) => {
    let result = await news.findAll({ order: Sequelize.literal("id DESC") });
    res.json(result);
});

// Add news
router.post("/news", async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (error, fields, files) => {
            let result = await news.create(fields);
            result = await uploadImageNews(files, result);
            res.json({
                result: constants.kResultOk,
                message: JSON.stringify(result)
            });
        });
    } catch (error) {
        res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
    }
});

// Update news
router.put("/news", async (req, res) => {
    try {
        var form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            let result = await news.update(fields, { where: { id: fields.id } });
            result = await uploadImageNews(files, fields);

            res.json({
                result: constants.kResultOk,
                message: JSON.stringify(result)
            });
        });
    } catch (err) {
        res.json({ result: constants.kResultNok, message: JSON.stringify(err) });
    }
});

// Delete news
router.delete("/news/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let result = await news.findOne({ where: { id: id } });
        await fs.remove(
            path.resolve(__dirname + "/uploaded/images/") + "/" + result.image
        );
        result = await news.destroy({ where: { id: id } });
        res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
    } catch (error) {
        res.json({ result: constants.kResultNok, message: "Internal error" });
    }
});

// Get news by Id
router.get("/news/:id", async (req, res) => {
    let result = await news.findOne({ where: { id: req.params.id } })
    if (result) {
        res.json(result);
    } else {
        res.json({});
    }
})


// Get news by Keyword
router.get("/news/keyword/:keyword", async (req, res) => {
    const { keyword } = req.params;
    let result = await news.findAll({ where: { name: { [Op.like]: `%${keyword}%` } } });
    res.json(result);
});

module.exports = router;

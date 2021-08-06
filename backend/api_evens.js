const express = require("express");
const router = express.Router();
const evens = require("./models/evens");
const Sequelize = require("sequelize");
const constants = require("./constant");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");
const Op = Sequelize.Op;

// Upload Image evens
uploadImageEvens = async (files, doc) => {
    if (files.image != null) {
        var fileExtention = files.image.name.split(".")[1];
        doc.image = `evens${doc.id}.${fileExtention}`;
        var newpath =
            path.resolve(__dirname + "/uploaded/images/") + "/" + doc.image;
        if (fs.exists(newpath)) {
            await fs.remove(newpath);
        }
        await fs.moveSync(files.image.path, newpath);

        // Update database
        let result = evens.update(
            { image: doc.image },
            { where: { id: doc.id } }
        );
        return result;
    }
};

// Get evens
router.get("/evens", async (req, res) => {
    let result = await evens.findAll({ order: Sequelize.literal("id DESC") });
    res.json(result);
});

// Add evens
router.post("/evens", async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (error, fields, files) => {
            let result = await evens.create(fields);
            result = await uploadImageEvens(files, result);
            res.json({
                result: constants.kResultOk,
                message: JSON.stringify(result)
            });
        });
    } catch (error) {
        res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
    }
});

// Update evens
router.put("/evens", async (req, res) => {
    try {
        var form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            let result = await evens.update(fields, { where: { id: fields.id } });
            result = await uploadImageEvens(files, fields);

            res.json({
                result: constants.kResultOk,
                message: JSON.stringify(result)
            });
        });
    } catch (err) {
        res.json({ result: constants.kResultNok, message: JSON.stringify(err) });
    }
});

// Delete evens
router.delete("/evens/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let result = await evens.findOne({ where: { id: id } });
        await fs.remove(
            path.resolve(__dirname + "/uploaded/images/") + "/" + result.image
        );
        result = await evens.destroy({ where: { id: id } });
        res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
    } catch (error) {
        res.json({ result: constants.kResultNok, message: "Internal error" });
    }
});

// Get evens by Id
router.get("/evens/:id", async (req, res) => {
    let result = await evens.findOne({ where: { id: req.params.id } })
    if (result) {
        res.json(result);
    } else {
        res.json({});
    }
})


// Get evens by Keyword
router.get("/evens/keyword/:keyword", async (req, res) => {
    const { keyword } = req.params;
    let result = await evens.findAll({ where: { name: { [Op.like]: `%${keyword}%` } } });
    res.json(result);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const classroom = require("./models/classroom");
const Sequelize = require("sequelize");
const constants = require("./constant");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");
const Op = Sequelize.Op;

// Upload Image classroom
uploadImage = async (files, doc) => {
    if (files.image != null) {
        var fileExtention = files.image.name.split(".")[1];
        doc.image = `classroom${doc.id}.${fileExtention}`;
        var newpath =
            path.resolve(__dirname + "/uploaded/images/") + "/" + doc.image;
        if (fs.exists(newpath)) {
            await fs.remove(newpath);
        }
        await fs.moveSync(files.image.path, newpath);

        // Update database
        let result = classroom.update(
            { image: doc.image },
            { where: { id: doc.id } }
        );
        return result;
    }
};

// Get classroom
router.get("/classroom", async (req, res) => {

    try {
        let result = await classroom.findAll({ order: Sequelize.literal("id DESC") });
        res.json(result);
    } catch (error) { res.json({ result: constants.kResultNok, message: JSON.stringify(error) }); }
});

// Add classroom
router.post("/classroom", async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (error, fields, files) => {
            let result = await classroom.create(fields);
            result = await uploadImage(files, result);
            res.json({
                result: constants.kResultOk,
                message: JSON.stringify(result)
            });
        });
    } catch (error) {
        res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
    }
});

// Update classroom
router.put("/classroom/:id", async (req, res) => {
    try {
        var form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            let result = await classroom.update(fields, { where: { id: fields.id } });
            result = await uploadImage(files, fields);

            res.json({
                result: constants.kResultOk,
                message: JSON.stringify(result)
            });
        });
    } catch (err) {
        res.json({ result: constants.kResultNok, message: JSON.stringify(err) });
    }
});

// Delete classroom
router.delete("/classroom/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let result = await classroom.findOne({ where: { id: id } });
        await fs.remove(
            path.resolve(__dirname + "/uploaded/images/") + "/" + result.image
        );
        result = await classroom.destroy({ where: { id: id } });
        res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
    } catch (error) {
        res.json({ result: constants.kResultNok, message: "Internal error" });
    }
});

// Get classroom by Id
router.get("/classroom/:buildingid", async (req, res) => {
    let result = await classroom.findAll({ where: { buildingid: req.params.buildingid } })
    if (result) {
        res.json(result);
    } else {
        res.json({});
    }
})


// Get classroom by Keyword
router.get("/classroom/keyword/:keyword", async (req, res) => {
    const { keyword } = req.params;
    let result = await classroom.findAll({ where: { name: { [Op.like]: `%${keyword}%` } } });
    res.json(result);
});

module.exports = router;

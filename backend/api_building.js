const express = require("express");
const router = express.Router();
const building = require("./models/building");
const Sequelize = require("sequelize");
const constants = require("./constant");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");
const { Console } = require("console");
const Op = Sequelize.Op;

// Upload Image building
uploadImageBuilding = async (files, doc) => {
    if (files.image != null) {
        var fileExtention = files.image.name.split(".")[1];
        doc.image = `building${doc.id}.${fileExtention}`;
        var newpath =
            path.resolve(__dirname + "/uploaded/images/") + "/" + doc.image;
        if (fs.exists(newpath)) {
            await fs.remove(newpath);
        }
        await fs.moveSync(files.image.path, newpath);

        // Update database
        let result = building.update(
            { image: doc.image },
            { where: { id: doc.id } }
        );
        return result;
    }
};

// Get building
router.get("/building", async (req, res) => {
    let result = await building.findAll({ order: Sequelize.literal("id DESC") });
    res.json(result);
});

// Add building
router.post("/building", async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (error, fields, files) => {
            let result = await building.create(fields);
            result = await uploadImageBuilding(files, result);
            res.json({
                result: constants.kResultOk,
                message: JSON.stringify(result)
            });
        });
    } catch (error) {
        res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
    }
});

// Update building
router.put("/building", async (req, res) => {
    try {
        var form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            let result = await building.update(fields, { where: { id: fields.id } });
            result = await uploadImageBuilding(files, fields);

            res.json({
                result: constants.kResultOk,
                message: JSON.stringify(result)
            });
        });
    } catch (err) {
        res.json({ result: constants.kResultNok, message: JSON.stringify(err) });
    }
});

// Delete building
router.delete("/building/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let result = await building.findOne({ where: { id: id } });
        await fs.remove(
            path.resolve(__dirname + "/uploaded/images/") + "/" + result.image
        );
        result = await building.destroy({ where: { id: id } });
        res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
    } catch (error) {
        res.json({ result: constants.kResultNok, message: "Internal error" });
    }
});

// Get building by Id
router.get("/building/:id", async (req, res) => {
    let result = await building.findOne({ where: { id: req.params.id } })
    if (result) {
        res.json(result);
    } else {
        res.json({});
    }
})


// Get building by Keyword
router.get("/building/keyword/:keyword", async (req, res) => {
    const { keyword } = req.params;
    let result = await building.findAll({
        where: {
            [Op.or]: [
                {
                    name: {
                        [Op.like]: `%${keyword}%`
                    }
                },
                {
                    tagname: {
                        [Op.like]: `%${keyword}%`
                    }
                }
            ]
        }
    });
    console.log(result);
    res.json(result);

});

module.exports = router;

const express = require("express")
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/uploaded"));
app.use(cors());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); //หรือใส่แค่เฉพาะ domain ที่ต้องการได้
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use("/api/v2/authen/", require("./api_authen"))
app.use("/api/v2/stock/", require("./api_stock"))
app.use("/api/v2/news/", require("./api_news"))
app.use("/api/v2/building/", require("./api_building"))
app.use("/api/v2/evens/", require("./api_evens"))
app.use("/api/v2/class/", require("./api_class"))

app.listen(8085, () => {
    console.log("Backend is running..")
})

let express = require("express");
let router = express.Router();

const awsWorker = require("../controller/s3.controller");

router.get("/consumer/*", awsWorker.getHtmlHandler);
module.exports = router;

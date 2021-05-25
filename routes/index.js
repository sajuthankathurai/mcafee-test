var express = require("express");
var router = express.Router();
var helperFunctions = require("../js/helperFunctions");
const axios = require("axios");

/* GET home page. */
router.get("/consumer/*", function (req, res, next) {
  console.log(req.url);
  //GET head content from request URL
  const headContent = async () => {
    try {
      const partialUrl = req.protocol + "://" + req.get("host") + req.url;
      return await axios.get(
        partialUrl.substring(0, partialUrl.lastIndexOf("/")) + "/head.html"
      );
    } catch (error) {
      console.error(error);
    }
  };

  //GET body content from request URL
  const bodyContent = async () => {
    try {
      const partialUrl = req.protocol + "://" + req.get("host") + req.url;
      return await axios.get(
        partialUrl.substring(0, partialUrl.lastIndexOf("/")) + "/body.html"
      );
    } catch (error) {
      console.error(error);
    }
  };

  Promise.all([headContent(), bodyContent()]).then(([a, b]) => {
    console.log(a, b);

    if (
      a.status == 200 &&
      b.status == 200 &&
      a != undefined &&
      b != undefined &&
      a.data != undefined &&
      b.data != undefined
    ) {
      res.render("index", {
        headContent: a.data,
        bodyContent: b.data,
      });
    } else {
      res.render("error");
    }
  });
});

module.exports = router;

const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
  res
    .setHeader("Content-Type", "text/html")
    .status(404)
    .render("404", { errorMesage: "Page Not Found!" });
});

module.exports = router;

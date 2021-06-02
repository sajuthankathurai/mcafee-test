const s3 = require("../config/s3.config.js");
const axios = require("axios");
const ejs = require("ejs");
const PageDataLayer = require("../models/pageLayers");

const fetchPageData = async (url) => {
  try {
    return await axios.get(url);
  } catch (error) {
    console.error(error);
  }
};

exports.getHtmlHandler = (req, res) => {
  const s3Client = s3.s3Client;
  const params = s3.downloadParams;
  params.Key = req.url.slice(1, req.url.length);
  const pageDataLayer = new PageDataLayer();

  fetchPageData(
    "https://96n7sgywli.execute-api.ap-south-1.amazonaws.com/default/getPageData"
  ).then((dta, err) => {
    console.log(dta);
    pageDataLayer.header = dta.data.header;
    pageDataLayer.beginingOfBody = dta.data.beginingOfBody;
    pageDataLayer.endOfBody = dta.data.endOfBody;
    s3Client.getObject(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
        res.status(500).json({ error: "Error -> " + err });
      } else {
        console.log(data);
        if (data.ContentType == "text/html") {
          let html = ejs.render(data.Body.toString(), pageDataLayer);
          res.send(html);
        }
      }
    });
  });
};

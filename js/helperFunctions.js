var digitalData = digitalData || {};
digitalData.offersGroup = {};

function storeDynamicModals(offer) {
  if (offer && offer !== "") {
    if (offer.includes("=")) {
      const obj = offer.split("=");
      if (digitalData.offersGroup[obj[0]] === undefined) {
        digitalData.offersGroup[obj[0]] = obj[1];
      }
    } else {
      if (digitalData.offersGroup[offer] === undefined) {
        digitalData.offersGroup[offer] = offer;
      }
    }
  }
}

function getPrice(val1, val2, defaultVal, digitalData) {
  if (defaultVal && defaultVal !== "" && val1 == undefined) {
    storeDynamicModals(defaultVal);
    return digitalData.offers[
      eval("digitalData.offersGroup." + defaultVal.split("=")[0])
    ][val2];
  }
  if (val1 == undefined) {
    return "";
  }

  return digitalData.offers[val1][val2];
}

module.exports = {
  getPrice,
};

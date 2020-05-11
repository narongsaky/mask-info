"use strict";
const _ = require("lodash");

function isArray(obj) {
  return !!obj && obj.constructor === Array;
}

function isObject(obj) {
  return !!obj && typeof obj === "object";
}

function isMaskable(key, value) {
  return !!key && !isObject(value) && !isArray(value);
}

const maskInfo = function(originalInfo, options) {
  const maskAllProperties = _.get(options, "all.keys", []);
  const maskNumber = options.maskNumber || 4;
  const maskSymbol = options.symbol || "*";
  const maskPartialKeys = _.get(options, "partial.keys", []);
  const maskPartialShowNumber = _.get(options, "partial.showNumber", 4);
  const maskPartialPosition = _.get(options, "partial.position", "end");

  const maskedInfo = JSON.stringify(originalInfo, (key, value) => {
    if (!isMaskable(key, value)) {
      return value;
    }

    if (maskAllProperties.indexOf(key) > -1) {
      return maskSymbol.repeat(maskNumber);
    }

    if (maskPartialKeys.indexOf(key) > -1) {
      if (value && value.length > maskPartialShowNumber) {
        if (maskPartialPosition === "start") {
          return (
            maskSymbol.repeat(maskNumber) +
            value.substring(value.length - maskPartialShowNumber, value.length)
          );
        } else {
          return (
            value.substring(0, maskPartialShowNumber) +
            maskSymbol.repeat(maskNumber)
          );
        }
      } else {
        return maskSymbol.repeat(maskNumber);
      }
    }

    return value;
  });

  return maskedInfo;
};

module.exports = maskInfo;

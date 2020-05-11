const maskInfo = require("./index");

var options = {
  symbol: "*",
  maskNumber: 4,
  all: {
    keys: ["password"]
  }
};

var originalInfo = {
  username: "james",
  password: "12345678"
};

var information = maskInfo(originalInfo, options);

console.log(information);

var options = {
  symbol: "*",
  maskNumber: 4,
  partial: {
    keys: ["email"],
    showNumber: 4,
    position: "start"
  }
};

var originalInfo = {
  firstname: "mr. james",
  lastname: "james",
  email: "james@gmail.com"
};

var information = maskInfo(originalInfo, options);

console.log(information);

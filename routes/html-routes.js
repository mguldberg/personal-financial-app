var express = require("express");

var router = express.Router();

// Requiring our models
var db = require("../models");



router.get("/", function (req, res) {
  db.User.findAll({}).then(function (data) {
    var hbsObject = {
      userData: "data"
    };
    console.log(hbsObject);
    res.render("users", hbsObject);
  });
});
router.get("/expenses/", function (req, res) {
  var hbsObject = {
    userData: "data"
  };
  res.render("expenses", hbsObject);
});
router.get("/investments/", function (req, res) {
  //place holder
  var hbsObject = {
    userData: 'data'
  }
  console.log(hbsObject);
  res.render("investments", hbsObject);

});
router.get("/contact_mg/", function (req, res) {
  //place holder
  var hbsObject = {
    userData: 'data'
  }
  console.log(hbsObject);
  res.render("contact_mg", hbsObject);

})

module.exports = router;
var express = require("express");

var router = express.Router();

// Requiring our models
var db = require("../models");

// Create all our routes and set up logic within those routes where required.

// Handles adding user to DB
router.post("/api/users/", function (req, res) {

    var signUpData = {
        firstName: $("#firstName").val().trim(),
        lastName: $("#lastName").val().trim(),
        username: $("#username1").val().trim(),
        password: $("#password1").val().trim(),
        phone: $("#phone").val().trim(),
        carrier: "something"
    }

    console.log("in create User handler");
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.username,
        password: req.body.password,
        cellPhone: req.body.phone,
        carrier: req.body.carrier,
    }).then(function (dbUserResp) {

        // We have access to the new todo as an argument inside of the callback function
        res.json(JSON.stringify(dbUserResp));

    })
        .catch(function (dbUserResp) {
            console.log("we got an error", dbUserResp);
            // Whenever a validation or flag fails, an error is thrown
            // We can "catch" the error to prevent it from being "thrown", 
            // which could crash our node app
            res.status(500).send(dbUserResp);

        });
});

// signin attempt of user
router.get("/api/users", function (req, res) {
    
    console.log("in create User handler");
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.User.findOne({
        userName: req.body.username,
    },
        {
            where: {
                password: req.body.password,
            }
        }).then(function (dbUserResp) {
            res.status(200).send(dbUserResp.id);

        })
        .catch(function (dbUserResp) {
            console.log("username/password are incorrect", dbUserResp);
            // Whenever a validation or flag fails, an error is thrown
            // We can "catch" the error to prevent it from being "thrown", 
            // which could crash our node app
            

        });
});


// Handles adding user to DB
router.post("/api/users/expenses", function (req, res) {

    var signUpData = {
        firstName: $("#firstName").val().trim(),
        lastName: $("#lastName").val().trim(),
        username: $("#username1").val().trim(),
        password: $("#password1").val().trim(),
        phone: $("#phone").val().trim(),
        carrier: "something"
    }

    console.log("in create User handler");
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.username,
        password: req.body.password,
        cellPhone: req.body.phone,
        carrier: req.body.carrier,
    }).then(function (dbUserResp) {

        // We have access to the new todo as an argument inside of the callback function
        res.json(JSON.stringify(dbUserResp));

    })
        .catch(function (dbUserResp) {
            console.log("we got an error", dbUserResp);
            // Whenever a validation or flag fails, an error is thrown
            // We can "catch" the error to prevent it from being "thrown", 
            // which could crash our node app
            res.status(500).send(dbUserResp);

        });
});


// Export routes for server.js to use.
module.exports = router;
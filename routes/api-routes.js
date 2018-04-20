var express = require("express");
var router = express.Router();

// Requiring our models
var db = require("../models");

// Create all our routes and set up logic within those routes where required.

// Handles adding user to DB
router.post("/api/users/", function (req, res) {

    console.log("in create User handler");
    console.log(req.body)
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.username,
        password: req.body.password,
        email: req.body.email,
        cellPhone: req.body.phone,
        carrier: req.body.carrier,
    }).then(function (dbUserResp) {

        // We have access to the new todo as an argument inside of the callback function
        res.json(JSON.stringify(dbUserResp));

    })
        .catch(function (err) {
            console.log("we got an error", err);
            // Whenever a validation or flag fails, an error is thrown
            // We can "catch" the error to prevent it from being "thrown", 
            // which could crash our node app
            res.status(400).send(err);

        });
});

// signin attempt of user
router.get("/api/users", function (req, res) {

    console.log("in create User handler");
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    console.log(req.query)
    db.User.findOne({
        where: {
            userName: req.query.username,
           $and:[{
            password: req.query.password
            }]
        }

    }).then(function (dbUserResp) {
        var hbsObject = {
            data: "data",
        }
        res.status(200).send(dbUserResp);
        // res.render("expenses", hbsObject);

    })
        .catch(function (dbUserResp) {
            console.log("username/password are incorrect", dbUserResp);
            // Whenever a validation or flag fails, an error is thrown
            // We can "catch" the error to prevent it from being "thrown", 
            // which could crash our node app


        });
});

// get expenses api
router.get("/api/expenses/:id", function (req, res) {

    console.log("in GET expenses handler");
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.User.findOne({
        where: {
            id: req.params.id
        },
        include: [db.Expense]
    }).then(function (dbExpenseResp) {
        res.status(200).send(dbExpenseResp);
    })
        .catch(function (dbExpenseResp) {
            console.log("expenses get had an error", dbExpenseResp);
            // Whenever a validation or flag fails, an error is thrown
            // We can "catch" the error to prevent it from being "thrown", 
            // which could crash our node app
            res.status(400).send(err);
        });
});

// Handles adding expense to DB
router.post("/api/expenses/:id", function (req, res) {

    console.log("in POST expenses handler");
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Expense.create({
        UserId: req.params.id,
        itemName: req.body.item,
        amount: req.body.amount,
        category: req.body.category,
        datePaid: "4/20/2018",

    }).then(function (dbExpenseResp) {
        // We have access to the new todo as an argument inside of the callback function
        res.json(JSON.stringify(dbExpenseResp));
    })
        .catch(function (dbExpenseResp) {
            console.log("we got an error", dbExpenseResp);
            // Whenever a validation or flag fails, an error is thrown
            // We can "catch" the error to prevent it from being "thrown", 
            // which could crash our node app
            res.status(500).send(dbExpenseResp);

        });
});

// Handles adding user to DB
router.post("/api/invenstment/", function (req, res) {

    console.log("in create User handler");
    console.log(req.body)
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.username,
        password: req.body.password,
        email: req.body.email,
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
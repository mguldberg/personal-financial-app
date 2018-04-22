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
    db.User.findOne({
        userName: req.body.username,
    },
        {
            where: {
                password: req.body.password,
            }
        }).then(function (dbUserResp) {
            res.status(200).send(dbUserResp);

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
        itemName: req.body.item,
        amount: req.body.amount,
        category: req.body.category,
        dataPaid: req.body.date_purchased,

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

router.get("/api/stocks", function (req, res) {
console.log("Hellooooooo");
var yahooFinance = require('yahoo-finance');
 
yahooFinance.historical({
  symbol: 'AAPL',
  from: '2018-04-01',
  to: '2018-04-22',
  // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
}, function (err, quotes) {
  console.log(quotes);
});
 
// This replaces the deprecated snapshot() API
yahooFinance.quote({
  symbol: 'AAPL',
  modules: [ 'price', 'summaryDetail' ] // see the docs for the full list
}, function (err, quotes) {
  console.log(quotes);
  //http://localhost:8080/api/stocks run this url in browser.
});
   
        
});



// Export routes for server.js to use.
module.exports = router;



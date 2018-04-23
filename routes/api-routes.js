//express NPM module and .Router to route front end AJAX requests 
var express = require("express");
var router = express.Router();

//cryptocompare and node-fetch NPM modules for getting crypto quotes
global.fetch = require('node-fetch')
const cc = require('cryptocompare')

//moment NPM module
var moment = require('moment');

//Yahoo Finance NPM module
var yahooFinance = require('yahoo-finance');

//email and text js files
var email = require("../messaging/email")
var texts = require("../messaging/texts")

// Requiring our DB models
var db = require("../models");

//global var that will be run once on init and then available for looking up crypto currency
var coinListObj = {};

//
// Create all our routes and set up logic within those routes where required.
//

// Handles adding user to DB
router.post("/api/users/", function (req, res) {

    console.log("in create User handler - /api/users/ - POST");
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
    }).then(function (dbUserResp) {

        // We have access to the new todo as an argument inside of the callback function
        res.json(JSON.stringify(dbUserResp));

        //functions from external .js file that send emails and texts
        email(dbUserResp.email)
        texts(dbUserResp.cellPhone)
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

    console.log("in signin attempt User handler - /api/users - GET");
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    console.log(req.query)
    db.User.findOne({
        where: {
            userName: req.query.username,
            $and: [{
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

    console.log("in GET expenses handler - /api/expenses/:id - GET");
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

    console.log("in POST expenses handler - /api/expenses/:id - POST");
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    console.log(req.body)
    db.Expense.create({
        UserId: req.params.id,
        itemName: req.body.item,
        amount: req.body.amount,
        category: req.body.category,
        datePaid: req.body.date_purchased,

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
router.post("/api/investment/:id", function (req, res) {

    console.log("inside Investment POST handler - /api/investment/:id - POST")

    switch (req.body.type) {
        //is this investment a Crypto Currency
        case 'Crypto Currency':
            //           
            // first check to see if Crypto name is valid
            //

            //initialize that we have not found a match before search loop
            var coinMatchBool = false;

            //strip out * from string in current index - will cause a crash if not handled
            regexString = req.body.investmentName.replace(/\*/g, "");
            console.log(regexString);

            //construct a regex string to look for in the coinList
            var regexVar = new RegExp(regexString, "gi");

            console.log("regexvar", regexVar)
            //loop through coinListObj set up when code first ran
            for (i in coinListObj.Data) {

                //use the RegExp .test function - returns true if a match is found
                coinMatchBool = regexVar.test(coinListObj.Data[i].FullName)

                //if a match was found
                //  - reset req.body.investmentName to proper symbol
                //  - set Image to store in DB for display by the Front End
                if (coinMatchBool == true) {
                    console.log("found a match");

                    //reset investmentName to proper symbol for doing API lookup of price, etc.
                    req.body.investmentName = coinListObj.Data[i].Symbol;

                    //set image URL for use in Front End Display
                    //"https://www.cryptocompare.com" + coinListObj.Data[i].ImageUrl
                    req.body.investmentImgUrl = coinListObj.Data[i].ImageUrl;
                    console.log(req.body.investmentImgUrl);

                    //stop looping we found a match
                    break;
                }
            }

            //if we didn't find a match - inform the user of the problem
            //leave immediately from this route and return error code to front end
            if (coinMatchBool == false) {
                console.log("invalid req.body.investmentName in investments POST handler");
                res.status(500).send({ msg: "Invalid CryptoCoin entered.  Please try again." });
            }
            console.log(req.body.investmentName);

            //API call requires an array of currencies
            var currencyArray = [req.body.investmentName];

            req.body.datePurchased = moment(req.body.datePurchased, 'MM/DD/YYYY').format('YYYY-MM-DD');

            console.log("date purchased ", req.body.datePurchased)

            // make API call to get current Stock value
            cc.priceFull(currencyArray, ['USD'])
                .then(prices => {
                    // -> { BTC: { USD: 1114.63 } }
                    console.log("cc.priceFull");
                    console.log(prices);
                    console.log(prices[req.body.investmentName].USD.PRICE);
                    req.body.currentValue = parseFloat(prices[req.body.investmentName].USD.PRICE) * req.body.amount;
                    console.log("current value of ", req.body.investmentName, " is ", req.body.currentValue);

                    //checking to see if the optional parameter for Cost Basis was sent
                    if (req.body.costBasis == 0) {
                        // make API call to get costBasis value
                        cc.priceHistorical(req.body.investmentName, ['USD'], new Date(req.body.datePurchased))
                            .then(cryptoHistoricalResponse => {
                                // pricesresponse format
                                // -> { BTC: { USD: 997, EUR: 948.17 } }
                                console.log("cc.priceHistorical");
                                console.log(cryptoHistoricalResponse);
                                console.log(cryptoHistoricalResponse.USD);

                                //set the costBasis = amount of the coin * price of the coin at the time of purchase
                                req.body.costBasis = req.body.amount * cryptoHistoricalResponse.USD

                                console.log(req.body.costBasis);

                                //make function call to add investment to the DB
                                addInvestment(req.params, req.body, coinListObj.Data[req.body.investmentName].ImageUrl, res);

                            })
                    }
                    else
                        //make function call to add investment to the DB
                        addInvestment(req.params, req.body, coinListObj.Data[req.body.investmentName].ImageUrl, res);

                })
                .catch(console.error);

            break;

        //is investment a Stock
        case 'Stock':

            // UserId: params.id,
            // type: body.type,
            // investmentName: body.investmentName,
            // amount: body.amount,
            // datePurchased: body.datePurchased,
            // costBasis: body.costBasis,
            // currentValue: body.currentValue,
            // investmentImgUrl: imgUrl

            req.body.datePurchased = moment(req.body.datePurchased, 'MM/DD/YYYY').format('YYYY-MM-DD');


            // This replaces the deprecated snapshot() API
            yahooFinance.quote({
                symbol: req.body.investmentName,
                modules: ['price', 'summaryDetail'] // see the docs for the full list
            }, function (err, currentQuotes) {
                console.log(currentQuotes);
                //http://localhost:8080/api/stocks run this url in browser.

                console.log("current stock price", currentQuotes.price.regularMarketPrice);

                //set current stock price
                req.body.currentValue = currentQuotes.price.regularMarketPrice;

                //checking to see if the optional parameter for Cost Basis was sent
                if (req.body.costBasis == 0) {
                    // call historic Stock price lookup api using Yahoo-finance API

                    yahooFinance.historical({
                        symbol: req.body.investmentName,
                        from: req.body.datePurchased,
                        to: req.body.datePurchased,
                        // period: 'd'  // 'd' (daily)
                    }, function (err, quotes) {
                        console.log("full quote response- historical", quotes[0]);
                        console.log(quotes[0].adjClose)
                        console.log(req.body.amount);
                        //set the costBasis = amount of the coin * price of the coin at the time of purchase
                        req.body.costBasis = req.body.amount * quotes[0].adjClose

                        console.log(req.body.costBasis);

                        //make function call to add investment to the DB
                        addInvestment(req.params, req.body, "#", res);
                    });



                }
                else
                    //make function call to add investment to the DB
                    addInvestment(req.params, req.body, "#", res);
            });


            // call Stock price lookup api using Yahoo-finance API

            break;

        default:
            console.log("invalid req.body.type in investments POST handler");
            res.status(500).send({ msg: "invalid req.body.type in investments POST handler" });

    };

});

//api route for getting all of the investments
router.get("/api/investment/:id", function (req, res) {
    db.User.findOne({
        where: {
            id: req.params.id
        },
        include: [db.Investment]
    }).then(function (dbInvestments) {
        res.json(dbInvestments);
    });
});

function addInvestment(params, body, imgUrl, res) {

    console.log("costBasis inside of addInvestments", body.costBasis);

    // INSERT new row into the Investments table using the UserID key
    db.Investment.create({
        UserId: params.id,
        type: body.type,
        investmentName: body.investmentName,
        amount: body.amount,
        datePurchased: body.datePurchased,
        costBasis: body.costBasis,
        currentValue: body.currentValue,
        investmentImgUrl: imgUrl
    }).then(function (dbInvestmentResp) {
        // We have access to the new todo as an argument inside of the callback function
        res.json(JSON.stringify(dbInvestmentResp));

    })
        .catch(function (dbInvestmentResp) {
            console.log("we got an error", dbInvestmentResp);
            // Whenever a validation or flag fails, an error is thrown
            // We can "catch" the error to prevent it from being "thrown", 
            // which could crash our node app
            res.status(500).send(dbInvestmentResp);
        });
}


//API call to get DB of valid coins
cc.coinList()
    .then(coinList => {
        console.log("cc.coinList");
        // console.log(coinListObj)
        // ->
        // {
        //   BTC: {
        //    Id: "1182",
        //    Url: "/coins/btc/overview",
        //    ImageUrl: "/media/19633/btc.png",
        //    Name: "BTC",
        //    Symbol: "BTC",
        //    CoinName: "Bitcoin",
        //    FullName: "Bitcoin (BTC)",
        //    Algorithm: "SHA256",
        //    ProofType: "PoW",
        //    FullyPremined: "0",
        //    TotalCoinSupply: "21000000",
        //    PreMinedValue: "N/A",
        //    TotalCoinsFreeFloat: "N/A",
        //    SortOrder: "1",
        //    Sponsored: false
        // },
        //   ETH: {...},
        // }
        coinListObj = coinList;
    })
    .catch(console.error)

// Export routes for server.js to use.
module.exports = router;



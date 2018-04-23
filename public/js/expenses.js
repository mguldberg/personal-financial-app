//Call id from local storage
var localVarStored = localStorage.getItem("userID");
console.log(localVarStored)
//call first name and deliver to page
var localFirstName=localStorage.getItem("firstName")
$("#first-name").append("<h1>Hello "+localFirstName+"!")

//Set default date as today
document.getElementById('date').valueAsDate = new Date();

//When submit button is pressed...
$(".expenses").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    var expenseData = {
        item: $("#item").val().trim(),
        amount: $("#amount").val().trim(),
        category: $('input[name=category]:checked').val(),
        date_purchased: $("#date").val().trim(),
    }
    console.log(expenseData)

    $.ajax("/api/expenses/" + localVarStored, {
        type: "POST",
        data: expenseData
    }).then(
        function (data) {
            console.log(data)
           // location.reload();
        }
    );
});
console.log("test")
$.ajax("/api/expenses/" + localVarStored, {
    type: "GET"
}).then(
    function (data) {
        console.log(data)

        console.log(data.Expenses[0].category)
        //Arrays and logic to organize data by category
        var foodArr = [];
        var entertainmentArr = []
        var housingArr = []
        var automobileArr = []
        var otherArr = []

        for (var i = 0; i < data.Expenses.length; i++) {
            console.log(data.Expenses[i].category)
            switch (data.Expenses[i].category) {
                case "Food":
                    foodArr.push(data.Expenses[i])
                    break;
                case "Entertainment":
                    entertainmentArr.push(data.Expenses[i])
                    break;
                case "Housing":
                    housingArr.push(data.Expenses[i])
                    break;
                case "Automobile":
                    automobileArr.push(data.Expenses[i])
                    break;
                case "Other":
                    otherArr.push(data.Expenses[i])
                    break;
                default:
                    console.log("nothing?")
            }
        }
        console.log(foodArr)
        console.log(entertainmentArr)
        console.log(housingArr)
        console.log(automobileArr)
        console.log(otherArr)

        //Variables to find totals $ spent in each category 
        var foodTotal = 0;
        var entertainmentTotal = 0;
        var housingTotal = 0;
        var automobileTotal = 0;
        var otherTotal = 0;

        //this is to calculate the amount of money spent on food
        for (var i = 0; i < foodArr.length; i++) {
            foodTotal = foodTotal + parseFloat(foodArr[i].amount)
        }
        //repeat loop for all category types
        for (var i = 0; i < entertainmentArr.length; i++) {
            entertainmentTotal = entertainmentTotal + parseFloat(entertainmentArr[i].amount)
        }
        for (var i = 0; i < housingArr.length; i++) {
            housingTotal = housingTotal + parseFloat(housingArr[i].amount)
        }
        for (var i = 0; i < automobileArr.length; i++) {
            automobileTotal = automobileTotal + parseFloat(automobileArr[i].amount)
        }
        for (var i = 0; i < otherArr.length; i++) {
            otherTotal = otherTotal + parseFloat(otherArr[i].amount)
        }
        var total = foodTotal + entertainmentTotal + housingTotal + automobileTotal + otherTotal

        //Check expense totals
        console.log("food: " + foodTotal.toFixed(2))
        console.log("entertainment: " + entertainmentTotal.toFixed(2))
        console.log("housing: " + housingTotal.toFixed(2))
        console.log("automobile: " + automobileTotal.toFixed(2))
        console.log("other: " + otherTotal.toFixed(2))
        console.log("total: " + total.toFixed(2))

        //Find percentages of expense types
        var foodPercent = foodTotal / total * 100
        var entertainmentPercent = entertainmentTotal / total * 100
        var housingPercent = housingTotal / total * 100
        var automobilePercent = automobileTotal / total * 100
        var otherPercent = otherTotal / total * 100
        console.log("foodPercent " + foodPercent.toFixed(2))
        console.log("entertainmentPercent " + entertainmentPercent.toFixed(2))
        console.log("housingPercent " + housingPercent.toFixed(2))
        console.log("automobilePercent " + automobilePercent.toFixed(2))
        console.log("otherPercent " + otherPercent.toFixed(2))

        //Define chartData array that will populate the primary pi chart
        var chartData = [
            {
                "name": "Food",
                "y": foodPercent,
                "drilldown": "Food",
                "amount": "$" + foodTotal.toFixed(2)
            },
            {
                "name": "Entertainment",
                "y": entertainmentPercent,
                "drilldown": "Entertainment",
                "amount": "$" + entertainmentTotal.toFixed(2)
            },
            {
                "name": "Housing",
                "y": housingPercent,
                "drilldown": "Housing",
                "amount": "$" + housingTotal.toFixed(2)
            },
            {
                "name": "Automobile",
                "y": automobilePercent,
                "drilldown": "Automobile",
                "amount": "$" + automobileTotal.toFixed(2)
            },
            {
                "name": "Other",
                "y": otherPercent,
                "drilldown": "Other",
                "amount": "$" + otherTotal.toFixed(2)
            }
        ]

        //Drilldown data (data for the secondary charts that activate when a section of the primary chart is clicked) must be given to HighCharts as arrays of objects
        var foodItemData = []
        var entertainmentItemData = []
        var housingItemData = []
        var automobileItemData = []
        var otherItemData = []
        //This is to format the itemName and amount data in such a way that the chart's drilldown function can render it. 
        for (var i = 0; i < foodArr.length; i++) {
            var currentItem = {}
            currentItem.name = foodArr[i].itemName
            //Item amount converted into a percentage of total expenses 
            currentItem.y = (parseFloat(foodArr[i].amount) / total * 100)
            //Now push the item amount in dollars
            currentItem.amount = ("$" + parseFloat(foodArr[i].amount).toFixed(2))
            //Push the currentItem array into the foodItemData array
            foodItemData.push(currentItem)
        }
        //Repeat loop for all categories
        for (var i = 0; i < entertainmentArr.length; i++) {
            var currentItem = {}
            currentItem.name = entertainmentArr[i].itemName
            currentItem.y = (parseFloat(entertainmentArr[i].amount) / total * 100)
            currentItem.amount = ("$" + parseFloat(entertainmentArr[i].amount).toFixed(2))
            entertainmentItemData.push(currentItem)
        }
        for (var i = 0; i < housingArr.length; i++) {
            var currentItem = {}
            currentItem.name = housingArr[i].itemName
            currentItem.y = (parseFloat(housingArr[i].amount) / total * 100)
            currentItem.amount = ("$" + parseFloat(housingArr[i].amount).toFixed(2))
            housingItemData.push(currentItem)
        }
        for (var i = 0; i < automobileArr.length; i++) {
            var currentItem = {}
            currentItem.name = automobileArr[i].itemName
            currentItem.y = (parseFloat(automobileArr[i].amount) / total * 100)
            currentItem.amount = ("$" + parseFloat(automobileArr[i].amount).toFixed(2))
            automobileItemData.push(currentItem)
        }
        for (var i = 0; i < otherArr.length; i++) {
            var currentItem = {}
            currentItem.name = otherArr[i].itemName
            currentItem.y = (parseFloat(otherArr[i].amount) / total * 100)
            currentItem.amount = ("$" + parseFloat(otherArr[i].amount).toFixed(2))
            otherItemData.push(currentItem)
        }

        //log drilldown item data arrays
        console.log("item data:")
        console.log(foodItemData)
        console.log(entertainmentItemData)
        console.log(housingItemData)
        console.log(automobileItemData)
        console.log(otherItemData)

        //Array of drilldown data for the pi chart
        var drillData = [
            {
                "name": "Food",
                "id": "Food",
                "data": foodItemData
            },
            {
                "name": "Entertainment",
                "id": "Entertainment",
                "data": entertainmentItemData
            },
            {
                "name": "Housing",
                "id": "Housing",
                "data": housingItemData
            },
            {
                "name": "Automobile",
                "id": "Automobile",
                "data": automobileItemData
            },
            {
                "name": "Other",
                "id": "Other",
                "data": otherItemData
            }
        ]

        //Render Pi Chart
        Highcharts.chart('container', {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Personal Expenses'
            },
            subtitle: {
                text: 'Total: <b>$' + total.toFixed(2) + '</b>'
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}: {point.y:.1f}%'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.amount}</b><br/> <b>{point.y:.2f}%</b> of total'
            },

            "series": [
                {
                    "name": "Expenses",
                    "colorByPoint": true,
                    "data":
                        chartData
                }
            ],
            "drilldown": {
                "series": drillData
            }
        });
    }
);

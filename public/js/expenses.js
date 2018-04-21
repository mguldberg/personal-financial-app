//Call id from local storage
var localVarStored = localStorage.getItem("userID");
console.log(localVarStored)

$(".expenses").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    var expenseData = {
        item: $("#item").val().trim(),
        amount: $("#amount").val().trim(),
        category: $("#category").val().trim(),
        date_purchased: $("#date").val().trim(),
    }
    event.preventDefault();
    console.log(expenseData)
    $.ajax("/api/expenses/" + localVarStored, {
        type: "POST",
        data: expenseData
    }).then(
        function (data) {
            console.log(data)
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
                default:
                    console.log("nothing?")
            }
        }
        console.log(foodArr)
        console.log(entertainmentArr)
        console.log(housingArr)
        console.log(automobileArr)

        //Variables to find totals $ spent in each category 
        var foodTotal = 0;
        var entertainmentTotal = 0;
        var housingTotal = 0;
        var automobileTotal = 0;

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
        var total = foodTotal + entertainmentTotal + housingTotal + automobileTotal

        //Check expense totals
        console.log("food: " + foodTotal.toFixed(2))
        console.log("entertainment: " + entertainmentTotal.toFixed(2))
        console.log("housing: " + housingTotal.toFixed(2))
        console.log("automobile: " + automobileTotal.toFixed(2))
        console.log("total: " + total.toFixed(2))

        //Find percentages of expense types
        var foodPercent = foodTotal / total * 100
        var entertainmentPercent = entertainmentTotal / total * 100
        var housingPercent = housingTotal / total * 100
        var automobilePercent = automobileTotal / total * 100
        console.log("foodPercent " + foodPercent.toFixed(2))
        console.log("entertainmentPercent " + entertainmentPercent.toFixed(2))
        console.log("housingPercent " + housingPercent.toFixed(2))
        console.log("automobilePercent " + automobilePercent.toFixed(2))

        //Define chartData array that will populate the primary pi chart
        var chartData = [
            {
                "name": "Food",
                "y": foodPercent,
                "drilldown": "Food",
                "amount":"$"+foodTotal.toFixed(2)
            },
            {
                "name": "Entertainment",
                "y": entertainmentPercent,
                "drilldown": "Entertainment",
                "amount":"$"+entertainmentTotal.toFixed(2)
            },
            {
                "name": "Housing",
                "y": housingPercent,
                "drilldown": "Housing",
                "amount":"$"+housingTotal.toFixed(2)
            },
            {
                "name": "Automobile",
                "y": automobilePercent,
                "drilldown": "Automobile",
                "amount":"$"+automobileTotal.toFixed(2)
            }
        ]

         //Drilldown data (data for the secondary charts that activate when a section of the primary chart is clicked) must be given to HighCharts as arrays of arrays
         var foodItemData = []
         var entertainmentItemData = []
         var housingItemData = []
         var automobileItemData = []

        //This is to format the itemName and amount data in such a way that the chart's drilldown function can render it. 
        for (var i = 0; i < foodArr.length; i++) {
            var currentItem = []
            currentItem.push(foodArr[i].itemName)
            //Item amount must be converted into a percentage of total expenses before being pushed to represent percentage
            currentItem.push(parseFloat(foodArr[i].amount) / total * 100)
            //Now push the item amount in dollars
            currentItem.push(parseFloat(foodArr[i].amount).toFixed(2))
            //Push the currentItem array into the foodItemData array
            foodItemData.push(currentItem)
        }
        //Repeat loop for all categories
        for (var i = 0; i < entertainmentArr.length; i++) {
            var currentItem = []
            currentItem.push(entertainmentArr[i].itemName)
            currentItem.push(parseFloat(entertainmentArr[i].amount) / total * 100)
            entertainmentItemData.push(currentItem)
        }
        for (var i = 0; i < housingArr.length; i++) {
            var currentItem = []
            currentItem.push(housingArr[i].itemName)
            currentItem.push(parseFloat(housingArr[i].amount) / total * 100)
            housingItemData.push(currentItem)
        }
        for (var i = 0; i < automobileArr.length; i++) {
            var currentItem = []
            currentItem.push(automobileArr[i].itemName)
            currentItem.push(parseFloat(automobileArr[i].amount) / total * 100)
            automobileItemData.push(currentItem)
        }

        //log drilldown item data arrays
        console.log("item data:")
        console.log(foodItemData)
        console.log(entertainmentItemData)
        console.log(housingItemData)
        console.log(automobileItemData)

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
                "data": entertainmentItemData
            },
            {
                "name": "Automobile",
                "id": "Automobile",
                "data": entertainmentItemData
            },
        ]
        //TEST ARRAY ONLY
        var someArr = [
            {
                "name": "Food",
                "y": 30.00,
                "drilldown": "Food",
            },
            {
                "name": "Gas",
                "y": 10.00,
                "drilldown": "Gas"
            },
            {
                "name": "Rent/Mortgage",
                "y": 30.00,
                "drilldown": "Rent"
            },
            {
                "name": "Entertainment",
                "y": 30.00,
                "drilldown": "Entertainment"
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
                text: 'Total: <b>$'+total.toFixed(2)+'</b>'
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
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/> <b>{point.amount}</b>'
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

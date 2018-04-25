//Call id from local storage
var localVarStored = localStorage.getItem("userID");
console.log(localVarStored)
//call first name and deliver to page
var localFirstName = localStorage.getItem("firstName")
$("#first-name").append("Hello " + localFirstName + "!")

console.log(localVarStored)
//Set default date to today
document.getElementById('date').valueAsDate = new Date();

//Log out when link is clicked...
$("#log-out").on("click",function(event){
    event.preventDefault();
    localStorage.clear();
    window.location = "/"
})

//When a delete button is pressed...
$("#demo").on('click', '.delete', function () {
    var thisId = $(this).parent().attr("id");
    console.log(thisId)

    var deleteData = {
        deleteId: thisId
    };

    $.ajax("/api/investment/" + localVarStored, {
        type: "DELETE",
        data: deleteData
    }).then(
        function (data) {
            console.log(data)
            location.reload();
        }
        )
})

//When the submit button is pressed...
$(".investments").on("submit", function (event) {
    console.log("test")

    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    var investmentData = {
        type: $('input[name=type]:checked').val(),
        investmentName: $("#investment-name").val().trim(),
        amount: $("#amount").val().trim(),
        costBasis: $("#cost-basis").val().trim(),
        datePurchased: $("#date").val().trim()
    }
    console.log(investmentData)
    $.ajax("/api/investment/" + localVarStored, {
        type: "POST",
        data: investmentData
    }).then(
        function (data) {
            console.log(data)
            location.reload();
        }
        )
        .fail(function (err) {
            console.log("getting an error from the database", err.status, err.statusText);
            console.log(err.status);
            console.log(err.responseJSON.errors["0"]);
            $(".modal-title").text("HTTP Error : " + err.status + " " + err.statusText);
            $("#error-text").text(err.responseJSON.errors["0"].message);
            $(".modal").modal('toggle');
        });

})
console.log("HELLO!")

//PUT call on page loading - this will trigger updated quotes for all investments and return to the front page
$.ajax("/api/investment/" + localVarStored, {
    type: "PUT"
}).then(
    function (putData) {

        //GET call on page loading - this will trigger updated quotes for all investments and return to the front page
        $.ajax("/api/investment/" + localVarStored, {
            type: "GET"
        }).then(
            function (getData) {
                console.log(getData)
                var total = 0
                console.log("test2")
                console.log(parseFloat(getData.Investments[0].amount))
                for (var i = 0; i < getData.Investments.length; i++) {
                    total = total + parseFloat(getData.Investments[i].currentValue)

                }
                console.log("total: " + total)
                var chartData = []
                for (var i = 0; i < getData.Investments.length; i++) {
                    var currentObj = {}
                    currentObj.name = getData.Investments[i].investmentName
                    currentObj.y = parseFloat(getData.Investments[i].currentValue) / total * 100
                    currentObj.amount = parseFloat(getData.Investments[i].amount) + " shares"
                    currentObj.dollars = "$" + parseFloat(getData.Investments[i].currentValue)
                    chartData.push(currentObj)
                }
                console.log("chart data:")
                console.log(chartData)

                //For loop to generate table --not relevent for pi graph calculation
                for (var i = 0; i < getData.Investments.length; i++) {
                    //Create div
                    $(".table-div").append("<div class='card' id='" + getData.Investments[i].id + "'></div>")
                    //apend item, amount, datepaid, and a button
                    $("#" + getData.Investments[i].id).append("<p><b>Investment: </b>" + getData.Investments[i].investmentName + "</p>")
                    $("#" + getData.Investments[i].id).append("<p><b>Type: </b>" + getData.Investments[i].type + "</p>")
                    $("#" + getData.Investments[i].id).append("<p><b>Dollar Value: </b>$" + getData.Investments[i].currentValue + "</p>")
                    $("#" + getData.Investments[i].id).append("<p><b>Stocks or Crypto Units: </b>" + getData.Investments[i].amount + "</p>")
                    $("#" + getData.Investments[i].id).append("<p><b>Date Purchased: </b>" + getData.Investments[i].datePurchased + "</p>")
                    $("#" + getData.Investments[i].id).append("<button class='btn btn-secondary delete'>Delete</button>")
                }
                //End table 

                //Render Pi Chart
                Highcharts.chart('container', {
                    chart: {
                        type: 'pie'
                    },
                    title: {
                        text: 'Investments'
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
                        headerFormat: ' ',
                        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.dollars}</b><br/> <b>{point.amount}</b><br/> <b>{point.y:.2f}%</b> of total'
                    },

                    "series": [
                        {
                            "name": "Investments",
                            "colorByPoint": true,
                            "data":
                                chartData
                        }
                    ],
                });
            }
            )
    })

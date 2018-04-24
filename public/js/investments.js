//Call id from local storage
var localVarStored = localStorage.getItem("userID");
console.log(localVarStored)
//call first name and deliver to page
var localFirstName=localStorage.getItem("firstName")
$("#first-name").append("Hello "+localFirstName+"!")

console.log(localVarStored)
//Set default date to today
document.getElementById('date').valueAsDate = new Date();

//When a delete button is pressed...
$("#demo").on('click', '.delete', function() {
    var thisId=$(this).parent().attr("id");
    console.log(thisId)
    $.ajax("/api/investment/" + localVarStored, {
        type: "DELETE",
        data: thisId
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
    var investmentData={
        type:$('input[name=type]:checked').val(),
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
$.ajax("/api/investment/" + localVarStored, {
    type: "GET"
}).then(
    function (data) {
        console.log(data)
        var total=0
        console.log("test2")
        console.log(parseFloat(data.Investments[0].amount))
        for(var i=0;i<data.Investments.length;i++){
           total=total+ parseFloat(data.Investments[i].currentValue)

        }
        console.log("total: "+total)
        var chartData=[]
        for(var i=0;i<data.Investments.length;i++){
            var currentObj={}
            currentObj.name=data.Investments[i].investmentName
            currentObj.y=parseFloat(data.Investments[i].currentValue)/total*100
            currentObj.amount=parseFloat(data.Investments[i].amount)+" shares"
            currentObj.dollars="$"+parseFloat(data.Investments[i].currentValue)
            chartData.push(currentObj)
        }
        console.log("chart data:")
        console.log(chartData)

        //For loop to generate table --not relevent for pi graph calculation
        for (var i = 0; i < data.Investments.length; i++) {
            //Create div
            $(".table-div").append("<div class='card' id='"+data.Investments[i].id+"'></div>")
            //apend item, amount, datepaid, and a button
            $("#"+data.Investments[i].id).append("<p><b>Investment: </b>"+data.Investments[i].investmentName+"</p>")
            $("#"+data.Investments[i].id).append("<p><b>Type: </b>"+data.Investments[i].type+"</p>")
            $("#"+data.Investments[i].id).append("<p><b>Dollar Value: </b>$"+data.Investments[i].currentValue+"</p>")
            $("#"+data.Investments[i].id).append("<p><b>Stocks or Crypto Units: </b>"+data.Investments[i].amount+"</p>")
            $("#"+data.Investments[i].id).append("<p><b>Date Purchased: </b>"+data.Investments[i].datePurchased+"</p>")
            $("#"+data.Investments[i].id).append("<button class='btn btn-secondary delete'>Delete</button>")
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

  
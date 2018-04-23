//Call id from local storage
var localVarStored = localStorage.getItem("userID");
    console.log(localVarStored)

$(".expenses").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    var expenseData={
        item:$("#item").val().trim(),
        amount: $("#amount").val().trim(),
        category: $("#category").val().trim(),
        date_purchased: $("#date").val().trim(),
    }
    event.preventDefault();
    console.log(expenseData)
    $.ajax("/api/expenses/"+localVarStored, {
        type: "POST",
        data: expenseData
    
    }).then(
        function (data) 
{
            console.log("hi")
            console.log(data)
        }
    );
});
console.log("test")
$.ajax("/api/expenses/"+localVarStored, {
    type: "GET"
}).then(
    function (data) {
        console.log(data)
       
      




        
    }
    
);






Highcharts.chart('container', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Basic drilldown'
    },
    xAxis: {
      type: 'category'
    },
  
    legend: {
      enabled: false
    },
  
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true
        }
      }
    },
  
    series: [{
      name: 'Things',
      colorByPoint: true,
      data: [{
        name: 'Animals',
        y: 5,
        drilldown: 'animals'
      }, {
        name: 'Fruits',
        y: 2,
        drilldown: 'fruits'
      }, {
        name: 'Cars',
        y: 4,
        drilldown: 'cars'
      }]
    }],
    drilldown: {
      series: [{
        id: 'animals',
        data: [{
            name: 'Mammals',
            y: 4,
            drilldown: 'mammals'
          },
          ['Reptiles', 2],
          ['Vertebrates', 1]
        ]
      },
  
      // second drill down
      {
        id: 'mammals',
        data: [['Cats', 3], ['Dogs', 2], ['Platypus', 1]]   
      }, {
        id: 'mammals',
        data: [{
            name: 'cats',
            y: 4,
            drilldown: 'cats'
          },
          ['one', 2],
          ['two', 1]
        ]
      },
      // third drill down
      {
        id: 'cats',
        data: [['Cats1', 3], ['Dogs1', 2], ['Platypus1', 1]]
      },{
        id: 'fruits',
        data: [
          ['Apples', 4],
          ['Oranges', 2]
        ]
      }, {
        id: 'cars',
        data: [
          ['Toyota', 4],
          ['Opel', 2],
          ['Volkswagen', 2]
        ]
      }]
    }
  });
  





var someArr=[
    {
        "name":"Food",
        "y":30.00,
        "drilldown":"Food"
    },
    {
        "name":"Gas",
        "y":10.00,
        "drilldown":"Gas"
    },
    {
        "name":"Rent/Mortgage",
        "y":30.00,
        "drilldown":"Rent"
    },
    {
        "name":"Entertainment",
        "y":30.00,
        "drilldown":"Entertainment"
    }
]




        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Browser market shares. January, 2018'
            },
            subtitle: {
                text: 'Click the slices to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
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
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },

            "series": [
                {
                    "name": "Browsers",
                    "colorByPoint": true,
                    "data": 
                    someArr
                    //[
                    //     {
                    //         "name": "Chrome",
                    //         "y": 62.74,
                    //         "drilldown": "Chrome"
                    //     },
                    //     {
                    //         "name": "Firefox",
                    //         "y": 10.57,
                    //         "drilldown": "Firefox"
                    //     },
                    //     {
                    //         "name": "Internet Explorer",
                    //         "y": 7.23,
                    //         "drilldown": "Internet Explorer"
                    //     },
                    //     {
                    //         "name": "Safari",
                    //         "y": 5.58,
                    //         "drilldown": "Safari"
                    //     },
                    //     {
                    //         "name": "Edge",
                    //         "y": 4.02,
                    //         "drilldown": "Edge"
                    //     },
                    //     {
                    //         "name": "Opera",
                    //         "y": 1.92,
                    //         "drilldown": "Opera"
                    //     },
                    //     {
                    //         "name": "Other",
                    //         "y": 7.62,
                    //         "drilldown": null
                    //     }
                    // ]
                }
            ],

        });
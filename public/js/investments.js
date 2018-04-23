//Set default date to today
document.getElementById('date').valueAsDate = new Date();

console.log("test")
$(".investments").on("submit", function (event) {
    console.log("test")

    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    var investmentData={
        type:$('input[name=type]:checked').val(),
        investmentName: $("#investment-name").val().trim(),
        amount: $("#amount").val().trim(),
        datePurchased: $("#date").val().trim()
    }
    console.log(investmentData)
    // $.ajax("/api/expenses/" + localVarStored, {
    //     type: "POST",
    //     data: expenseData
    // }).then(
    //     function (data) {
    //         console.log(data)
    //         location.reload();
    //     }
    // );
})


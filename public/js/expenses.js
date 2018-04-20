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
    var localVarStored = localStorage.getItem("userID");
    $.ajax("/api/expenses/"+localVarStored, {
        type: "POST",
        data: expenseData
    }).then(
        function (data) {
            console.log(data)
        }
    );
});
console.log("test")

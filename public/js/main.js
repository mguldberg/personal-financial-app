console.log("test")





$(".sign-up").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    var signUpData={
        firstName:$("#firstName").val().trim(),
        lastName: $("#lastName").val().trim(),
        username: $("#username1").val().trim(),
        password: $("#password1").val().trim(),
        email: $("#email").val().trim(),
        phone: $("#phone").val().trim(),
    }
    console.log(signUpData)
    $.ajax("/api/users", {
        type: "POST",
        data: signUpData
    }).then(
        function (data) {
            console.log(data)
        }
    );
});


$(".sign-in").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    var signInData={
        username:$("#username2").val().trim(),
        password: $("#password2").val().trim(),
    }
    event.preventDefault();
    console.log(signInData)
    $.ajax("/api/users", {
        type: "GET",
        data: signInData
    }).then(
        function (data) {
            console.log(data)
            localStorage.setItem("userID", data.id);
           var localVarStored = localStorage.getItem("userID");

           localStorage.setItem("firstName",data.firstName);
         
            console.log(localVarStored)
            //renderExpenses();
            if(data){
                window.location="/expenses"
            }
        }
        
    );
    
});

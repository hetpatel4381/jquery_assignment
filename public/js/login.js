$(document).ready(function () {
  //Creating the login form
  var loginForm = $("<form>").attr("id", "loginForm");

  //Appending the form to the body
  $("body").append(
    $("<h1>").text("Login"),
    loginForm.append(
      $("<label>").attr("for", "email").text("Email:"),
      $("<input>").attr({
        type: "text",
        id: "email",
        name: "email",
        required: true,
      }),
      $("<label>").attr("for", "password").text("Password:"),
      $("<input>").attr({
        type: "password",
        id: "password",
        name: "password",
        required: true,
      }),
      $("<button>").attr("type", "submit").text("Login")
    ),
    $("<a>").attr("href", "#").text("Forgot Password"),
    " | ",
    $("<a>").attr("href", "registration.html").text("Register Here")
  );

  //Handling the login form submission
  loginForm.submit(async function (event) {
    event.preventDefault();

    //Getting the form values
    var email = $("#email").val();
    var password = $("#password").val();
    console.log(email, password);

    try {
      const reqBody = { email: email, password: password };
      const headers = {
        "Content-Type": "application/json", 
      };
      const reqBodyJson = JSON.stringify(reqBody);

      const response = await axios.post(
        "http://localhost:8000/users/login",
        reqBodyJson,
        { headers }
      );
      const responseData = response.data;
      const userType = responseData.user.type;
      localStorage.setItem("userType", userType);
      console.log(response);

      if (responseData.success === true) {
        //Redirecting to the home page.
        window.location.href = "dish.html";
      } else {
        window.alert("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

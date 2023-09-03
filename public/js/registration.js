$(document).ready(function () {
  //Appending registration elements to the body
  $("body").append('<form id="registrationForm">');
  $("#registrationForm").append('<label for="name">Name:</label>');
  $("#registrationForm").append(
    '<input type="text" id="name" name="name"><br><br>'
  );

  $("#registrationForm").append('<label for="email">Email:</label>');
  $("#registrationForm").append(
    '<input type="email" id="email" name="email"><br><br>'
  );

  $("#registrationForm").append('<label for="password">Password:</label>');
  $("#registrationForm").append(
    '<input type="password" id="password" name="password"><br><br>'
  );

  $("#registrationForm").append('<label for="type">Type:</label>');
  $("#registrationForm").append('<select id="type" name="type">');
  $("#type").append('<option value="manager">Manager</option>');
  $("#type").append('<option value="visitor">Visitor</option>');
  $("#registrationForm").append("</select><br><br>");

  $("#registrationForm").append('<input type="submit" value="Submit">');
  $("#registrationForm").append("</form>");

  //Handling the registration form submission
  $("#registrationForm").submit(async function (event) {
    event.preventDefault(); 

    const email = $("#email").val();
    const password = $("#password").val();
    const type = $("#type").val();

    try {
      const reqBody = { "email": email, "password": password, "type": type };
      console.log(email, password, typeof type);
      const headers = {
        "Content-Type": "application/json", 
      };
      const reqBodyJson = JSON.stringify(reqBody); 
      const response = await axios.post(
        "http://localhost:8000/users/registration",
        reqBodyJson,
        { headers }
      );
      const responseData = response.data;
      console.log(response);

      if (responseData.success === true) {
        window.location.href = "login.html";
      } else {
        window.alert("Registration Failed");
      }
    } catch (error) {
      console.log("Error", error);
    }
  });
});

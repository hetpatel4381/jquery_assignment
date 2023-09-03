$(document).ready(async function () {
  //creating html components
  var addButton = $("<button>").attr("id", "addDishBtn").text("Add Dish");
  var dishContainer = $("<div>").attr("id", "dishContainer");
  var logOutButton = $("<button>").attr("id", "logOutBtn").text("Logout");

  //Appending the elements to the body
  var userType = localStorage.getItem("userType");
  console.log(userType);
  if (userType === "manager") {
    $("body").append(addButton, logOutButton, dishContainer);
  } else {
    $("body").append(logOutButton, dishContainer);
  }

  const headers = {
    "Content-Type": "application/json",
  };

  const getDishResponse = await axios.get(
    "http://localhost:8000/dishes/getDishes",
    { headers }
  );

  const getDishResponseData = getDishResponse.data;

  getDishResponseData.forEach((dish) => {
    addDish(dish.name, dish.imgUrl, dish.price);
  });

  //Function to add a new dish to the body
  function addDish(name, photoUrl, price) {
    localStorage.setItem("currentDish", name);
    localStorage.setItem("currentPrice", price);
    //Creating a new dish element
    const dishElement = `
            <div class="dish">
                <h3 class="dname">${name}</h3>
                <img class="dimg_url" src="${photoUrl}" alt="${name}">
                <p class="dprice">Price: $${price}</p>
                ${
                  userType === "visitor"
                    ? '<button class="buyDishBtn">Buy</button>'
                    : ""
                }
            </div>
        `;

    //Appending the dish to the dishContainer
    $("#dishContainer").append(dishElement);
  }

  //Handling click event for the "Add dish" button
  $("#addDishBtn").click(async function () {
    //Prompt the user for dish details
    console.log("add dish clicked");
    const name = prompt("Enter dish Name:");
    const photoUrl = prompt("Enter dish Photo URL:");
    const price = parseFloat(prompt("Enter dish Price:"));

    //Checking if the user entered valid information
    if (name && photoUrl && price) {
      try {
        const reqBody = {
          name: name,
          imgUrl: photoUrl,
          price: price,
        };
        const headers = {
          "Content-Type": "application/json",
        };
        const reqBodyJson = JSON.stringify(reqBody);
        const addDishResponse = await axios.post(
          "http://localhost:8000/dishes/add",
          reqBodyJson,
          { headers }
        );
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      alert("Invalid input. Please provide valid dish details.");
    }
  });

  $("#logOutBtn").click(async function () {
    localStorage.removeItem("userType");
    window.alert("Logout Successful");
    window.location.href = "login.html";
  });

  //Handling click event for the "Buy" button (delegated event)
  $("#dishContainer").on("click", ".buyDishBtn", function () {
    const currentDish = localStorage.getItem("currentDish");
    const currentPrice = localStorage.getItem("currentPrice");
    window.alert("You have bought " + currentDish + " for Rs." + currentPrice);
  });
});

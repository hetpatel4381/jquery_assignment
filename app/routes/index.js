const userRoutes = require("./userRoutes");
const dishRoutes = require("./dishRoutes");

module.exports = (app, passport) => {
  app.use("/users", userRoutes);
  app.use("/dishes",dishRoutes);
};

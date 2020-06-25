// Dependencies
var orm = require("./config/orm.js");
var express = require("express");
var exphbs = require("express-handlebars");
require('dotenv').config();

// Set the port of our application
var PORT = process.env.PORT || 8080;

// Create an instance of the express app
var app = express();
app.use(express.static('public'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Set default templating engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// GET routes
app.get("/", async (req, response) => {
    var result = await orm.selectFrom();
    var burgers = result.filter(burger => burger.devoured == 0);
    var devouredBurgers = result.filter(burger => burger.devoured == 1);
    response.render("index", {burgers: burgers, devouredBurgers: devouredBurgers});
});

app.post("/burgers", async (req, response) => {
    await orm.insertInto(req.body.burgerInput, 0);
    response.redirect("/");
}); 

app.post("/devoured", async (req, response) => {
    await orm.updateWhere(req.body.devouredInput);
    response.redirect("/");
}); 

// Start the server
app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT);
  });
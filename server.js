// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
require('dotenv').config();
var routes = require("./controllers/burger-controller")

// Set the port of our application
var PORT = process.env.PORT || 8080;

// Create an instance of the express app
var app = express();
app.use(express.static('public'));

// Set default templating engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
app.use("/", routes);

// Start the server
app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT);
});
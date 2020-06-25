// Dependencies
var mysql = require("mysql");
require('dotenv').config();
var express = require("express");
var exphbs = require("express-handlebars");

// Create an instance of the express app
var app = express();
app.use(express.static('public'));

// Set the port of our application
var PORT = process.env.PORT || 8080;

// Setting up database connection
var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : 'burgers'
  });

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the burger database!");
});

// Set default templating engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
app.get("/", function(req, response) {
    connection.query("SELECT * FROM items;", function(err, res) {
        if (err) throw err;
        console.log(res);
        response.render("index", {burgers: res});
      });
});

// Start the server
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
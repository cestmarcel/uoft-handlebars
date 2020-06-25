// Dependencies
var mysql = require("mysql");
require('dotenv').config();
var express = require("express");
var exphbs = require("express-handlebars");

// Create an instance of the express app
var app = express();
app.use(express.static('public'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Set the port of our application
var PORT = process.env.PORT || 8080;

// Setting up database connection
var connection;
if(process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : 'burgers'
      });
};

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the burger database!");
});

// Set default templating engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// GET routes
app.get("/", function(req, response) {
    connection.query("SELECT * FROM items;", function(err, res) {
        if (err) throw err;
        var burgers = res.filter(burger => burger.devoured == 0);
        var devouredBurgers = res.filter(burger => burger.devoured == 1);
        response.render("index", {burgers: burgers, devouredBurgers: devouredBurgers});
      });
});

app.post("/burgers", function(req, response){
    connection.query("INSERT INTO items (name, devoured) VALUES (?, ?)", 
        [req.body.burgerInput, 0], function(err, res){
            if(err) throw err;
            response.redirect("/");
        });
}); 

app.post("/devoured", function(req, response){
    connection.query("UPDATE items SET devoured=1 WHERE name=?", 
        [req.body.devouredInput], function(err, res){
            if(err) throw err;
            response.redirect("/");
        });
}); 

// Start the server
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
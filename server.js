// Dependencies
var mysql = require("mysql");
require('dotenv').config();

// Setting up connection
var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : 'burgers'
  });

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the database! Starting employee tracker...");
    afterConnection();
});
var connection = require("./connection.js");

var orm = {
    selectFrom: function(){
        var queryString = "SELECT * FROM items";
        return new Promise( (resolve, reject) => {
            connection.query(queryString, (err, res) => {
                if (err) throw err;
                resolve(res);
              });
        })
    },
    insertInto: function(burgerName, devouredStatus){
        var queryString = "INSERT INTO items (name, devoured) VALUES (?, ?)";
        return new Promise((resolve, reject) => {
            connection.query(queryString, 
                [burgerName, devouredStatus], (err, res) => {
                    if(err) throw err;
                    resolve(res);
                });
        })
    },
    updateWhere: function(devouredInput){
        var queryString = "UPDATE items SET devoured=1 WHERE name=?";
        return new Promise((resolve, reject) => {
            connection.query(queryString, 
                [devouredInput], (err, res) => {
                    if(err) throw err;
                    resolve(res);
                });
        })
    }
};

module.exports = orm;
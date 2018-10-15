var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "password", // super secure! (sarcasm)
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    connection.query("SELECT * FROM products",
        function (err, res) {
            if (err) throw err;
            for (let i in res) {
                console.log(res[i].item_id + " | " +
                    res[i].product_name + " | " +
                    res[i].price + " | " +
                    res[i].stock_quantity);
            }
            // Log all results of the SELECT statement
            askToBuy();
        });
}

function askToBuy() {
    inquirer
        .prompt({
            name: "query_id",
            type: "input",
            message: "Which item, by id [1-" + res.length + "], would you like to choose?"
        })
        .then(function (answer) {
            let id = parseInt(answer.query_id);
            if (id > 0 && id < 11) {
                askHowMany(id);
            } else {
                console.log("Please enter a valid item id!");
                askToBuy();
            }
        })
}

function askHowMany(id) {
    inquirer
    .prompt({
        name: "amount",
        type: "input",
        message: "How many would you like to buy?"
    })
    .then(function (answer) {
        var query_amount = parseInt(answer.amount);
        var stock_amount = 0;
        console.log("Processing request ...");
        connection.query("SELECT * FROM products WHERE ?",
        {
            item_id: id
        }, function(err,res) {
            if (err) throw err;
            stock_amount = res[0].stock_quantity;
            var new_amount = stock_amount - query_amount;
            if (new_amount >= 0) {
                connection.query("UPDATE products SET ? WHERE ? ",
                [{
                    stock_quantity: new_amount
                },{
                    item_id: id
                }]);
            } else if (new_amount < 0) {
                connection.query("SELECT * FROM products WHERE ?",
                {
                    item_id: id
                }, function(err,res) {
                    if (err) throw err;
                    var name = res[0].product_name;
                    console.log("The store is cannot complete your order of " + 
                        name + ". Please order something else!");
                });
            }
            start();
        });
    })
}
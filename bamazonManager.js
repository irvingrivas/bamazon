var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
        .prompt({
            name: "choice",
            type: "list",
            choices: ["View Products For Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"],
            message: "What would you like to do?"
        }).then(function (answer) {
            console.log("\n");
            switch (answer.choice) {
                case "View Products For Sale":
                    viewProducts();
                    break;
                case "View Low Inventory":
                    viewLowInventory();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addNewProduct();
                    break;
            }
            console.log("\n");
        })
}

function viewProducts() {
    console.log("All Products!");
    connection.query("SELECT * FROM products",
        function (err, res) {
            if (err) throw err;
            for (let i in res) {
                console.log(res[i].item_id + " | " +
                    res[i].product_name + " | " +
                    res[i].price + " | " +
                    res[i].stock_quantity);
            }
        });
}

function viewLowInventory() {
    console.log("Low Inventory!");
    connection.query("SELECT * FROM products WHERE stock_quantity BETWEEN ? AND ?",
        [1, 5],
        function (err, res) {
            if (err) throw err;
            for (let i in res) {
                console.log(res[i].item_id + " | " +
                    res[i].product_name + " | " +
                    res[i].price + " | " +
                    res[i].stock_quantity);
            }
        });
}

function addInventory() {
    console.log("Adding Inventory!");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([{
                name: "item",
                type: "input",
                message: "Which item, by id [1-" + res.length + "], would you like to add to?"
            }, {
                name: "amount",
                type: "input",
                message: "How many would you like to add?"
            }])
            .then(function (answer) {
                var item_id = parseInt(answer.item);
                connection.query("SELECT * FROM products WHERE ?",
                    {
                        item_id: item_id
                    }, function (err, res) {
                        var new_amount = parseInt(res[0].stock_quantity) + parseInt(answer.amount);
                        connection.query("UPDATE products SET ? WHERE ?",
                            [{
                                stock_quantity: new_amount
                            }, {
                                item_id: item_id
                            }], function (err, res) {
                                if (err) throw err;
                                console.log("Added Inventory!");
                                viewProducts();
                            })
                    })
            })
    })
}

function addNewProduct() {
    console.log("Adding New Product!");
    inquirer
        .prompt([{
            name: "item",
            type: "input",
            message: "What product would you like to add",
        }, {
            name: "dep",
            type: "input",
            message: "What department is the product in?",
        }, {
            name: "price",
            type: "input",
            message: "How much would you like the product to be?",
        }, {
            name: "amount",
            type: "input",
            message: "How many would you like to add?",
        }])
        .then(function (answer) {
            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.item,
                    price: parseInt(answer.price),
                    stock_quantity: parseInt(answer.amount),
                    department_name: answer.dep
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " product inserted!\n");
                    viewProducts();
                }
            );
        })
}
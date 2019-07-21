// Dependencies
// =============================================================
const mysql = require("mysql");
const inquirer = require("inquirer");
const colors = require("colors");
require("dotenv").config();

// Creates connections for SQL DB
// =============================================================
const options = {
  port: 3306,
  host: "localhost",
  user: "root",
  password: process.env.password,
  database: "bamazon_DB"
};

const connection = mysql.createConnection(options);

connection.connect(
  (err = () => {
    // if (err) throw err;
    console.log("connected as id " + connection.threadId);
    list();
  })
);

// List items
// =============================================================
list = () => {
  connection.query("SELECT * FROM products", function(err, res) {
    // if (err) throw err;
    if (res) {
      console.log(
        "Bamazon is a totally orginal idea and store. Not at all a rip off of Amazon. Here is what we have!"
      );
      for (var i = 0; i < res.length; i++) {
        console.log(
          "============================================================="
        );
        console.log(
          colors.yellow(
            "Item Id: " +
              res[i].item_id +
              "    " +
              "Product Name: " +
              res[i].product_name
          )
        );
        console.log(colors.blue("Department: " + res[i].department_name));
        console.log(
          colors.magenta(
            "Price: " + "$" + res[i].price + "      " + "Stock Quanity: " + res[i].stk_qty
          )
        );
      }
    }
    shopping();
  });
};

// Buy items
// =============================================================
shopping = () => {
  inquirer
    .prompt([
      {
        name: "itemSelected",
        type: "input",
        message: "What is the item_id you'd like to buy?",
        filter: Number
        }
      ,
      {
        name: "numberNeeded",
        type: "input",
        message: "How many would you like?",
        filter: Number
      }
    ])
    // Check quanity items
    // =============================================================
    .then(answer => {
      connection.query("SELECT * FROM products", function(err, results) {
        // if (err) throw err;

        var itemSelected;
        var numberNeeded = answer.numberNeeded;

        for (i = 0; i < results.length; i++) {
          if (results[i].item_id === parseInt(answer.itemSelected)) {
            itemSelected = results[i];
          }
        }

        if (itemSelected.stk_qty >= parseInt(numberNeeded)) {
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stk_qty: itemSelected.stk_qty - parseInt(answer.numberNeeded)
              },
              {
                item_id: itemSelected.item_id
              }
            ],
            function(err) {
              // if (err) throw err;

              console.log(colors.green(
                "Thanks! Your total is $" +
                  parseInt(numberNeeded) * itemSelected.price +
                  "!"
              ));
              list();
            }
          );
        } else {
          console.log(colors.red("Sorry we don't have what you are looking for!"));
          list();
        }
      });
    });
};

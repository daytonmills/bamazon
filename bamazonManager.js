const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require('chalk');
require('console.table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

connection.connect((error) =>
{
    if (error) throw error;
    manager.start();
});

var manager = {
    start: function()
    {
        console.log(chalk.bgRed.black.bold('\n  Bamazon Manager  \n'));
        inquirer.prompt([{
            message: "Manager Main Menu",
            type: "list",
            choices: ["View Products For Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "action"
        }]).then((options) => {
            switch (options.action)
            {
                case "View Products For Sale":
                    viewProducts();
                    break;
                case "View Low Inventory":
                    viewInventory();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addProduct();
                    break;
            }
        });
    }
}
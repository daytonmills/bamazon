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
            message: 'Manager Main Menu',
            type: 'list',
            choices: ['View Products For Sale', 'View Low Inventory', 'Add New Product', 'Add To Inventory'],
            name: 'action'
        }]).then((options) => {
            switch (options.action)
            {
                case 'View Products For Sale':
                    this.viewProducts();
                    break;
                case 'View Low Inventory':
                    this.viewInventory();
                    break;
                case 'Add New Product':
                    this.addProduct();
                    break;
                case 'Add To Inventory':
                    this.addInventory();
                    break;
            }
        });
    },

    viewProducts: function(callback)
    {
        connection.query('SELECT * FROM products', (error, products) =>
        {
            console.table(products);
            if (callback) callback();
            connection.end();
        });
    },

    viewInventory: function()
    {
        connection.query('SELECT * FROM products WHERE stock_quantity < 5', (error, products) =>
        {
            if (error) throw error;
            if (products.length > 0) {
                console.table(products);
            } else {
                console.log(chalk.yellow("Inventory is Full!"));
            }
            connection.end();
        });
    },
}
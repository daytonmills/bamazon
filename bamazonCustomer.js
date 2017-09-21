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
    bamazon.start();
});

var bamazon = {
    start: function()
    {
        console.log(chalk.bgYellow.black.bold('\n  Bamazon Market  \n'));
        connection.query('SELECT * FROM products', (error, products) =>
        {
            if (error) throw (error);
            console.table(products);
            this.transaction();
        });
    },

    transaction: function()
    {
        inquirer.prompt([{
            message: 'Enter the item id for the product you wish to purchase',
            type: 'input',
            name: 'item_id'
        },
        {
            message: 'Enter your desired quantity',
            type: 'input',
            name: 'quantity'
        }]).then(function (transaction) {
            bamazon.purchase(transaction.item_id, transaction.quantity);
        });
    },

    purchase: function(item_id, quantity)
    {
        connection.query('SELECT `stock_quantity`, `product_name`, `price` FROM `products` WHERE `item_id` = ?',
        [item_id], (error, item) =>
        {
            if (error) throw error;
            if (item[0].stock_quantity >= quantity) {
                checkout(item_id, item[0].stock_quantity-quantity, quantity, item[0].product_name, item[0].price);
            } else {
                console.log(chalk.red.bold('ERROR: ') + chalk.red('Not enough items in stock!'));
                this.start();
            }
        });

        function checkout(item_id, quantity, amount, name, price) {
            connection.query('UPDATE `products` SET ? WHERE ?',
            [{stock_quantity: quantity},{item_id: item_id}],
            (error, results, fields) =>
            {
                console.log(chalk.green.bold('SUCCESS: ') +
                chalk.green('Your order of '+amount+' '+name+' for $'+price*amount+' has been placed.'));
            });
            connection.end();
        }
    }
}
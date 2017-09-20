const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require('chalk');
require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect((error) =>
{
    if (error) throw error;
    start();
});

function start() {
    console.log(chalk.bgYellow.black.bold("\n  Welcome to Bamazon!  \n"));
    connection.query("SELECT * FROM products", (error, products) => {
        if (error) throw (error);
        console.table(products);
    });
}
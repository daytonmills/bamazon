# bamazon
_UCSD Coding Bootcamp. Week 7 - Homework 1_
Bamazon is a simple node.js command line interface that connects to a MySQL database to demonstrate queries between the two.

## Customer View
The customer is able to only purchase products which are pulled from the database.
As you can see below the user is shown a table of products, and is prompted to select an item and quantity. Upon selection, the user is given the total price for the quantity of the selected product.
![customer view screenshot](images/customer.png)

## Manager View
Unlike the Customer view, the Manager view is capable of performing multiple actions.
![manager menu view screenshot](images/manager.png)

Like the aforementioned view however, the Manager can of course view the products in the database.
![manager view screenshot](images/manager-view.png)

If desired, the Manager can add a new product into the database.
![manager product screenshot](images/manager-product.png)

The manager can also view only products that are low on inventory (less than 5.)
![manager low screenshot](images/manager-low.png)

And of course, the manager can restock any of the products.
![manager stock screenshot](images/manager-stock.png)

## Video Demonstration
https://youtu.be/Td9urDJJau0
-- CREATE DATABASE bamazon_DB;
USE bamazon_DB;

CREATE TABLE products(
  item_id int AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(8, 2) NOT NULL,
  stk_qty INT(10) NOT NULL,
  PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stk_qty) 
VALUES ("shoes", "clothes", 50.00, 80), 
("shirt", "clothes", 20.00, 100), 
("pants", "clothes", 60.00, 100), 
("printer", "tech", 100.00, 30), 
("mouse", "tech", 15.00, 200), 
("computer", "tech", 1500.00, 20), 
("monitor", "tech", 150.00, 50), 
("scissors", "office", 5.00, 200), 
("pens", "office", 1.00, 400), 
("tape", "office", 2.00, 250)
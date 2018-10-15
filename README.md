# Bamazon
# Node.js & MySQL

## Steps To Runs

This is a node and MySQL store app.

This is to be ran on a terminal that has node and npm.

The setup instructions are the following:

```
git clone "https://github.com/irvingrivas/bamazon"
cd bamazon
npm install
node ${files_below}
```

### bamazonCustomer.js

1. Create a MySQL Database called `bamazon`. You can do this by running schema "bamazon.sql" file in this area in MySQL workbench and importing the csv "products.csv" file in this area.

2. The products table should have each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

3. The CSV should have sample data for the columns above.

4. The app should then prompt users with two messages.

   * The first asks you the ID of the product you would like to buy.
   * The second message asks how many units of the product you would like to buy.

5. Once you have placed the order, the application checks if the store has enough of the product to meet your request.

   * If not, the app logs an error phrase.

6. However, if the store _does_ have enough of the product, your request will be fufilled.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, you will see the total cost of their purchase.

- - -

### bamazonManager.js

  * Running this will list a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

  * If a manager selects `View Products for Sale`, the app will list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, the app will list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, the app will display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, the app will allow the manager to add a completely new product to the store.

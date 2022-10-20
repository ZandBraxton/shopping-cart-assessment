# Shopping Cart Assessment

My shopping cart backend using JavaScript, Express, Node, and a MongoDB database.

I also created a minimal frontend client, and a docker repo with an easy way to launch a container with the backend, frontend, and mongo server all coupled together.
>[Docker repo](https://github.com/ZandBraxton/shopping-cart-docker) 



## Installation and run
1. Install [MongoDB](https://www.mongodb.com/try/download/community?tck=docs_server) and [Node.js](https://nodejs.org).
2. Clone/Download repo.
3. From root folder, install dependencies with `npm i`.
4. Start server and database with `npm run start`.
5. Open [localhost:3000](http://localhost:3000) to access the server.



## API Routes


### [Products Routes](#1-product-routes)
| Routes        | Description           | 
| ------------- |:-------------:|
| [`GET/products/`](#get-all-products)    |Get all products (stored in a json file)|
| [`GET/products/:productId`](#get-product-by-id)     |Get a product by its ID |     

### [Cart Routes](#2-cart-routes)
| Routes        | Description           | 
| ------------- |:-------------:|
| [`GET/cart/`](#get-cart)    |Get cart from database|
| [`POST/cart/add`](#add-to-cart)    |Add an item to cart|
| [`PUT/cart/update/`](#update-cart)    |Update an item's quantity in the cart|
| [`DELETE/cart/delete/:productId`](#delete-from-cart)    |Delete an item from the cart|
| [`POST/cart/checkout`](#checkout-cart)    |Checkout (flushes the cart)|

##Examples using Postman

### Get all products
Grabs all products currently stored in the JSON file, normally, this would grab from the database if the products were stored in there.

![Preview](https://user-images.githubusercontent.com/81108459/197003754-b7a71c78-6300-424d-82a4-3fabe8399b8b.png)

----
### Get product by id
Grabs a product by its id defined in the JSON file.

![Preview](https://user-images.githubusercontent.com/81108459/197004089-27e9748c-79ec-403e-84e8-af46b9876747.png)

----
### Get cart
Returns the cart in the database, there is only one cart as the application is set up for one user. 
In this case, the cart is empty.

![Preview](https://user-images.githubusercontent.com/81108459/197004572-0ff4fa69-9af2-4282-8861-019f1a7f6d8a.png)

----
### Add to cart
Adds an item to the cart, using `res.body` to send the productId and quantity to be added.

![Preview](https://user-images.githubusercontent.com/81108459/197004803-454f1a9c-5465-4e23-ada9-2c8a51a0ebe7.png)

----
### Update cart
Updates the quantity of an item in the cart, if the quantity is set to 0, the item is deleted.

![Preview](https://user-images.githubusercontent.com/81108459/197005308-bd4d6277-4a26-402b-94ac-40e894254ef7.png)

----
### Delete from cart
Delete an item from the cart, using the params in the api route for the `productId`.
In this case, the previous item with a `productID` of `2` was deleted

![Preview](https://user-images.githubusercontent.com/81108459/197005086-5c8802f5-b490-4411-9b8c-6db767717f3d.png)

----
### Checkout cart
Empties the cart

![Preview](https://user-images.githubusercontent.com/81108459/197005526-2bbdeabd-6977-4db2-859f-3763ac38e7a0.png)

----









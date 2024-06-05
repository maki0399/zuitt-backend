<!-- NOTE: modify this file based on your project specifications-->

## E-COMMERCE API DOCUMENTATION

***INSTALLATION COMMAND:***

```npm install```

***TEST ACCOUNTS:***
- Regular User:
     - email: user@mail.com
     - pwd: user123
- Admin User:
    - email: admin_01@gmail.com
    - pwd: admin123
    

***ROUTES:***
- User registration (POST)
    - http://localhost:4000/users/register
    - auth header required: NO
    - request body: 
        - email (string)
        - mobileNo (string)
        - password (string)
- User authentication/Login (PUT)
    - http://localhost:4000/users/login
    - auth header required: NO
    - request body: 
        - email (string)
        - password (string)

- Retriving Authenticated user details (GET)
    - http://localhost:4000/users/:userId/userDetails
    - auth header required: YES
    - request body: none

- Setting up user to admin, ADMIN ONLY (GET)
    - http://localhost:4000/users/:userId/setAsAdmin
    - auth header required: YES
    - request body:
        - userId (string)

***ROUTES FOR PRODUCT***
- Create new product ADMIN ONLY (POST)
    - http://localhost:4000/product
    - auth header required: YES
    - request body: 
        - name (string)
        - description (string)
        - price (number)
- Retrieve all products ADMIN ONLY  (GET)
    - http://localhost:4000/product/all
    - auth header required: NO
    - request body: none
- Retrieve all active products (GET)
    - http://localhost:4000/product/products
    - auth header required: NO
    - request body: none
- Retrieve Specific Product (GET)
    - http://localhost:4000/product/:productId
    - auth header required: NO
    - request body: none
- Update Product Information ADMIN ONLY (PUT)
    - http://localhost:4000/product/productId
    - auth header required: YES
    - request body: 
        - name (string)
        - description (string)
        - price (number)
- Archive Product ADMIN ONLY (PUT)
    - http://localhost:4000/product/:productId/archive
    - auth header required: YES
    - request body: none
- Activate product ADMIN ONLY (PUT)
    - http://localhost:4000/product/:productId/activate
    - auth header required: YES
    - request body: none

***ROUTE FOR ORDER***
- Create/make order AUTHENTICATED USER ONLY, ADMIN FORBIDDEN
    - http://localhost:4000/users/orders
    - auth header required: YES
    - request body
        - orderId (string)
        - productId (string)
- Retrieving order, authenticated USER only (GET)
    - http://localhost:4000/users/orders
    - auth header required: YES
    - request body: none

- Retrieving order, authenticated ADMIN only (GET)
    - http://localhost:4000/users/myOrders
    - auth header required: YES
    - request body: none
 




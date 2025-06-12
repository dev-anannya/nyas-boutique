# Nya's Boutique

## Live Demo
```
https://nyasboutique.infy.uk/
```


## Features:
- Browse products
- Filter & sort products
- Add to cart with price calculation
- User authentication (signup and login)

## Project Structure:
```
-  api/
   -  db.php
   -  login.php
   -  products.php
   -  signup.php
-  images/
-  index.html
-  README.md
-  script.js
-  styles.css
```


## API Endpoints:
- `api/db.php`: Database connection setup.
- `api/login.php`: User login endpoint.
- `api/products.php`: Fetch products endpoint.
- `api/signup.php`: User signup endpoint.

## Approach:
### Backend (PHP):
- **Database Connection**: The `db.php` file sets up a connection to the MySQL database.
- **User Authentication**:
  - `signup.php` handles user registration by inserting new users into the `users` table with hashed passwords.
  - `login.php` handles user login by verifying the provided credentials against the stored hashed passwords.
  - `logout.php` handles user logout by destroying the session and redirecting to the homepage.
- **Products API**: 
   - `products.php` fetches products and their varieties from the database and returns them in JSON format.
   - `insert_products.php` inserts predefined products and their varieties into the database.

### Frontend (HTML, CSS, JavaScript):
- **HTML**: The `index.html` file contains the structure of the storefront, including the navigation bar, banner, categories, best seller carousel, and footer.
- **CSS**: The `styles.css` file styles the storefront with a Regencycore theme, including the navbar, banner, categories grid, best seller carousel, and footer.
- **JavaScript**: The `script.js` file handles fetching products from the API, displaying them, managing the shopping cart, and implementing search functionality.


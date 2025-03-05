# Porfyro Storefront Assignment

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

## How to Run:
1. Start a PHP server:
   ```bash
   php -S localhost:8000
   ```
2. Open `index.html` in your browser:
   ```
   http://localhost:8000/index.html
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
- **Products API**: `products.php` returns a list of products in JSON format.

### Frontend (HTML, CSS, JavaScript):
- **HTML**: The `index.html` file contains the structure of the storefront, including the navigation bar, banner, categories, best seller carousel, and footer.
- **CSS**: The `styles.css` file styles the storefront with a Regencycore theme, including the navbar, banner, categories grid, best seller carousel, and footer.
- **JavaScript**: The `script.js` file handles fetching products from the API, displaying them, managing the shopping cart, and implementing search functionality.

## Additional Notes:
- Ensure you have a MySQL database named `porfyro_store` with a `users` table for user authentication.
- The `images/` folder should contain the necessary images for the banner, categories, and best sellers.
- The project uses FontAwesome for icons in the navigation bar.

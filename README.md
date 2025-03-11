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

## Database Setup:
1. Install MySQL and start the MySQL server.
2. Create a new database named `porfyro_assignment`:
   ```sql
   CREATE DATABASE porfyro_assignment;
   ```
3. Create a `users` table for user authentication:
   ```sql
   USE porfyro_assignment;
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL
   );
   ```
4. Create a `products` table for product listings.
```sql 
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL
);
```
5. Create a `product_varieties` table for varieties of the products.
```sql 
   CREATE TABLE product_varieties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```
6. Paste the `INSERT` queries for the `products` table from the `products.txt` file present in the root.

7. Paste the `INSERT` queries for the `product_varieties` table from the `product_varieties.txt` file present in the root.


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

## Additional Notes:
- Ensure you have a MySQL database named `porfyro_store` with `users`, `products` and `product_varieties` tables.
- The `images/` folder should contain the necessary images for the banner, categories, and best sellers.
- The project uses FontAwesome for icons in the navigation bar.
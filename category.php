<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Porfyro Boutique - Category</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>

    <!-- Navigation Bar -->
    <nav class="navbar">
        <ul>
            <li><a href="index.html#banner">nya's</a></li>
            <li><a href="index.html#banner">home</a></li>
            <li><a href="index.html#collections">collections</a></li>
            <!-- <li><a href="#">about</a></li>
            <li><a href="#">contact</a></li> -->
        </ul>
       
        <div class="navbar-right">
            <!-- Currency Selector -->
            <div class="currency-selector">
                <select>
                    <option>USD $ | United States</option>
                    <option>INR ₹ | India</option>
                    <option>EUR € | Europe</option>
                    <option>GBP £ | United Kingdom</option>
                </select>
            </div>
    
            <!-- Search & Cart Icons -->
            <div class="nav-icons">
                <i class="fas fa-search" onclick="toggleSearchBar()"></i>  <!-- Search Icon -->
                <a href="./cart.html"><i class="fas fa-shopping-bag"></i></a>  <!-- Shopping Bag Icon -->
                <a href="./login.html"><i class="fas fa-user"></i></a>   <!-- User Icon -->
            </div>
        </div>  
    </nav>

    <!-- Search Bar -->
    <div id="searchBar" class="search-bar">
        <input type="text" id="searchInput" placeholder="Search" oninput="liveSearch()">
        <i class="fas fa-search"></i>
        <button class="close-btn" onclick="toggleSearchBar()">×</button>
    </div>

    <!-- Regencycore Banner with Store Name -->
    <section class="banner" id="banner">
        <img src="./images/indexbanner.jpg" alt="Fashion Banner">
        <div class="overlay"></div>  
        <h1 class="store-name">nya's</h1>
    </section>

    <!-- Category Products -->
    <section class="category-products" id="category-title">
        <div class="sidebar">
            <h3>Sort By</h3>
            <button onclick="sortProducts('low-to-high')">Price: Low to High</button>
            <button onclick="sortProducts('high-to-low')">Price: High to Low</button>
        </div>
        <div class="product-grid" id="productGrid"></div>
    </section>

    <!-- Footer -->
    <footer>
        <p>&copy; 2025 Porfyro Boutique. All Rights Reserved.</p>
    </footer>

    <script src="script.js">
        
    console.log("Script.js is loaded");
</script>

    
</body>
</html>
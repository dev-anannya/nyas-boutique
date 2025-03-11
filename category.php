<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>nya's collections</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>

    <!-- Navigation Bar -->
    <nav class="navbar">
        <ul>
            <li><a href="index.php#banner">nya's</a></li>
            <li><a href="index.php#banner">home</a></li>
            <li><a href="index.php#collections">collections</a></li>
        </ul>
       
        <div class="navbar-right">
            <!-- Currency Selector -->
            <div class="currency-selector">
                <select>
                    <option>INR ₹ | India</option>
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
        <div id="searchResults" class="search-results"></div>
    </div>

    <!-- Banner-->
    <section class="banner" id="banner">
        <img src="./images/indexbanner.jpg" alt="Fashion Banner">
        <div class="overlay"></div>  
        <h1 class="store-name">nya's</h1>
    </section>

    <!-- Category Products -->
    <section class="category-products" id="category-title">
        <div class="sidebar">
            <h3>Sort By</h3>
            <select id="sortDropdown" onchange="sortProducts(this.value)">
                <option value="default">Default</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
            </select>
        </div>
        <div class="product-grid" id="productGrid"></div>
    </section>

    <!-- Footer -->
    <footer>
        <p>&copy; 2025 nya's. All Rights Reserved.</p>
    </footer>

    <script src="script.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            fetchProducts();
        });

        function fetchProducts() {
            const urlParams = new URLSearchParams(window.location.search);
            const category = urlParams.get("category") || "all";
            let url = "products.php";
            if (category) {
                url += `?category=${encodeURIComponent(category)}`;
            }

            fetch(url)
                .then(response => response.json())
                .then(products => {
                    const productGrid = document.getElementById('productGrid');
                    productGrid.innerHTML = '';
                    products.forEach(product => {
                        const productCard = document.createElement('div');
                        productCard.classList.add('product-card');
                        productCard.innerHTML = `
                            <div class="product-image">
                                <img src="${product.image_url}" alt="${product.name}">
                            </div>
                            <div class="product-info">
                                <h3>${product.name}</h3>
                                <select class="variety-select" onchange="updatePrice(this)">
                                    ${product.varieties.map(variety => 
                                        `<option value="${variety.id}" data-price="${variety.price}">${variety.name} - ₹${variety.price}</option>`
                                    ).join("")}
                                </select>
                                <p class="price">Price: ₹${product.varieties[0].price}</p>
                                <button class="add-cart" onclick="addToCart('${product.id}', '${product.name}', this)">Add to Cart</button>
                            </div>
                        `;
                        productGrid.appendChild(productCard);
                    });
                })
                .catch(error => console.error("Error fetching products:", error));
        }
    </script>
</body>
</html>
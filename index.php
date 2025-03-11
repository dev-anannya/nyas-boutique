<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>welcome at nya's </title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>

    <!-- Navigation Bar -->
    <nav class="navbar">
        <ul>
            <li><a href="#banner">nya's</a></li>
            <li><a href="#banner">home</a></li>
            <li><a href="#categories">collections</a></li>
            <!-- <li><a href="#">about</a></li>
            <li><a href="#">contact</a></li> -->
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
                <a href="./cart.html"><i class="fas fa-shopping-bag"></i></a> <!-- Shopping Bag Icon -->
                <?php if (isset($_SESSION['username'])): ?>
                    <!-- <span>Hello, <?php echo htmlspecialchars($_SESSION['username']); ?></span> -->
                    <!-- <span>Logout</span> -->
                    <a href="./api/logout.php"><i class="fas fa-sign-out-alt"></i></a> <!-- Logout Icon -->
                <?php else: ?>
                    <a href="./login.html"><i class="fas fa-user"></i></a> <!-- User Icon -->
                <?php endif; ?>
            </div>
        </div>  
    </nav>

    <!-- Search Bar -->
    <div id="searchBar" class="search-bar">
        <input type="text" id="searchInput" placeholder="Search" onkeyup="liveSearch()">
        <i class="fas fa-search"></i>
        <button class="close-btn" onclick="toggleSearchBar()">×</button>
        <div id="searchResults" class="search-results"></div>
    </div>
    
    <!--Banner with Store Name -->
    <section class="banner" id="banner" style="height: <?php echo isset($_SESSION['username']) ? '50vh' : '100vh'; ?>;">
        <img src="./images/indexbanner.jpg" alt="Fashion Banner">
        <div class="overlay"></div>  
        <h1 class="store-name">nya's</h1>
    </section>

    <?php if (isset($_SESSION['username'])): ?>
        <div class="welcome-message" style="text-align: left; font-family: 'Playfair Display', serif; font-size: 3rem; color: #5a3e36; margin-top: 1rem; padding: 0 2rem;">
            <p>Welcome, <?php echo htmlspecialchars($_SESSION['username']);?>!</p>
        </div
    <?php endif; ?> >

    <!-- Categories -->
    <section class="categories" id="categories">
        <div class="category-item"><a href="category.php?category=Accessories">
            <img src="./images/accessories.jpg" alt="Accessories">
            <div class="category-title">Accessories</div>
        </div></a>
        <div class="category-item"><a href="category.php?category=Jewelry">
            <img src="./images/jewlery.jpg" alt="Jewelry">
            <div class="category-title">Jewelry</div>
        </div></a>
        <div class="category-item"><a href="category.php?category=Dresses">
            <img src="./images/dresses.jpg" alt="Dresses">
            <div class="category-title">Dresses</div>
        </div></a>
        <div class="category-item"><a href="category.php?category=Tops">
            <img src="images/tops.jpg" alt="Tops">
            <div class="category-title">Tops</div>
        </div></a>
        <div class="category-item"><a href="category.php?category=Skirts">
            <img src="./images/skirts.jpg" alt="Skirts">
            <div class="category-title">Skirts</div>
        </div></a>
        <div class="category-item"><a href="category.php?category=Bags">
            <img src="./images/bags.jpg" alt="Bags">
            <div class="category-title">Bags</div>
        </div></a>
    </section>

    
    <!-- Footer -->
    <footer>
        <p>&copy; 2025 nya's. All Rights Reserved.</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
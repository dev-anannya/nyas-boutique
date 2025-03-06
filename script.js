document.addEventListener("DOMContentLoaded", function () {
    loadCartFromLocalStorage();
    fetchProducts();
    setupSearch();
});

// Fetch Products from API
async function fetchProducts() {
    try {
        const response = await fetch("http://localhost:8000/api/products.php");
        if (!response.ok) throw new Error("Failed to fetch products");

        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        document.getElementById("products").innerHTML = `<p class="error">Failed to load products. Try again later.</p>`;
    }
}

// Display Products
function displayProducts(products) {
    const productContainer = document.getElementById("products");
    productContainer.innerHTML = "";

    products.forEach(product => {
        let productCard = `
            <div class="product-card">
                <img src="${product.image_url}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <select class="variety-select">
                    ${product.varieties.map(v => `<option value="${v.id}" data-price="${v.price}">${v.name} - ₹${v.price}</option>`).join("")}
                </select>
                <button onclick="addToCart('${product.id}', '${product.name}', this)">Add to Cart</button>
            </div>
        `;
        productContainer.innerHTML += productCard;
    });
}

// Cart Functionality
let cart = [];

function addToCart(productId, productName, button) {
    let select = button.previousElementSibling;
    let selectedOption = select.options[select.selectedIndex];
    let price = parseInt(selectedOption.getAttribute("data-price"));
    let variety = selectedOption.text;

    let existingItem = cart.find(item => item.id === productId && item.variety === variety);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, variety, price, quantity: 1 });
    }

    saveCartToLocalStorage();
    updateCart();
}

function updateCart() {
    const cartContainer = document.getElementById("cart");
    const totalContainer = document.getElementById("total");
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartContainer.innerHTML += `
            <div class="cart-item">
                ${item.name} (${item.variety}) - ₹${item.price} x ${item.quantity}
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <button onclick="changeQuantity(${index}, 1)">+</button>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    totalContainer.innerText = "Total: ₹" + total;
}

function changeQuantity(index, amount) {
    cart[index].quantity += amount;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    saveCartToLocalStorage();
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToLocalStorage();
    updateCart();
}

// Save Cart to Local Storage
function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Search Functionality
function toggleSearchBar() {
    const searchBar = document.getElementById('searchBar');
    const overlay = document.createElement('div');
    overlay.className = 'dimmed-overlay';
    document.body.appendChild(overlay);

    if (searchBar.classList.contains('active')) {
        searchBar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.removeChild(overlay);
    } else {
        searchBar.classList.add('active');
        overlay.classList.add('active');
    }

    overlay.addEventListener('click', function () {
        searchBar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.removeChild(overlay);
    });
}

function liveSearch() {
    const query = document.getElementById('searchInput').value.trim();
    const resultsContainer = document.getElementById('searchResults');

    if (query.length === 0) {
        resultsContainer.innerHTML = '';
        return;
    }

    fetch(`api/search.php?q=${encodeURIComponent(query)}`)
        .then(response => response.text())
        .then(data => {
            resultsContainer.innerHTML = data;
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
        });
}

// scripts.js

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'default';  // Default category if none provided

    // Fetch products based on the category
    loadCategoryProducts(category);

    function loadCategoryProducts(category) {
        // This is a simulated list of products for different categories
        const products = {
            'Accessories': [
                { name: 'Sunglasses', price: '$50', image: 'sunglasses.jpg', link: 'product-detail.html?id=1' },
                { name: 'Handbag', price: '$150', image: 'handbag.jpg', link: 'product-detail.html?id=2' },
                // Add more products...
            ],
            'Clothing': [
                { name: 'T-shirt', price: '$30', image: 'tshirt.jpg', link: 'product-detail.html?id=3' },
                { name: 'Jeans', price: '$70', image: 'jeans.jpg', link: 'product-detail.html?id=4' },
                // Add more products...
            ],
            // Add other categories...
        };

        const categoryProducts = products[category] || [];  // Default to empty array if category not found

        const productGrid = document.querySelector('.product-grid');
        productGrid.innerHTML = '';  // Clear any existing products

        categoryProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${product.price}</p>
                <a href="${product.link}" class="product-link">View Details</a>
            `;
            
            productGrid.appendChild(productCard);
        });
    }
});

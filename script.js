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
function setupSearch() {
    document.getElementById("search-btn").addEventListener("click", function () {
        let searchTerm = document.getElementById("search-input").value.toLowerCase();
        let filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm));
        displayProducts(filteredProducts);
    });
}

// Checkout Function
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Total amount: ₹${total}\nThank you for shopping!`);

    cart = [];
    saveCartToLocalStorage();
    updateCart();
}

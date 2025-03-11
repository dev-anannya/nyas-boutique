const exchangeRates = {
    INR: 1,
    USD: 0.013, // Example rate: 1 INR = 0.013 USD
    GBP: 0.0097, // Example rate: 1 INR = 0.0097 GBP
    EUR: 0.011, // Example rate: 1 INR = 0.011 EUR
};

const currencySymbols = {
    INR: '₹',
    USD: '$',
    GBP: '£',
    EUR: '€',
};

let currentCurrency = 'INR';

function changeCurrency(currency) {
    currentCurrency = currency;
    const productPrices = document.querySelectorAll('.price');
    productPrices.forEach(priceElement => {
        const originalPrice = parseFloat(priceElement.dataset.originalPrice);
        const convertedPrice = (originalPrice * exchangeRates[currency]).toFixed(2);
        priceElement.textContent = `Price: ${currencySymbols[currency]}${convertedPrice}`;
    });

    const cartTotal = document.querySelector('.cart-total');
    if (cartTotal) {
        const originalTotal = parseFloat(cartTotal.dataset.originalTotal);
        const convertedTotal = (originalTotal * exchangeRates[currency]).toFixed(2);
        cartTotal.textContent = `Total: ${currencySymbols[currency]}${convertedTotal}`;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const productGrid = document.getElementById("productGrid");

    function fetchProducts(category = "") {
        let url = "products.php";
        if (category) {
            url += `?category=${encodeURIComponent(category)}`;
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); 
            })
            .then(products => {
                console.log("Fetched products:", products); // Debugging

                if (!Array.isArray(products) || products.length === 0) {
                    productGrid.innerHTML = "<p>No products found.</p>";
                    return;
                }

                productGrid.innerHTML = ""; // Clears previous products

                products.forEach(product => {
                    const productCard = document.createElement("div");
                    productCard.classList.add("product-card");
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

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category") || "all";
    fetchProducts(category);
});

function updatePrice(selectElement) {
    const selectedOption = selectElement.selectedOptions[0];
    const priceText = selectElement.closest(".product-card").querySelector(".price");
    priceText.textContent = `Price: ₹${selectedOption.dataset.price}`;
}

function sortProducts(order) {
    let products = [...document.querySelectorAll(".product-card")];

    products.sort((a, b) => {
        let priceA = parseFloat(a.querySelector(".variety-select").selectedOptions[0].dataset.price);
        let priceB = parseFloat(b.querySelector(".variety-select").selectedOptions[0].dataset.price);

        return order === "low-to-high" ? priceA - priceB : priceB - priceA;
    });

    const productGrid = document.getElementById("productGrid");
    productGrid.innerHTML = "";
    products.forEach(product => productGrid.appendChild(product));
}

function liveSearch() {
    const query = document.getElementById("searchInput").value.trim();
    const resultsContainer = document.getElementById("searchResults");

    if (query.length === 0) {
        resultsContainer.innerHTML = "";
        resultsContainer.style.display = "none";
        return;
    }

    fetch(`api/search.php?q=${encodeURIComponent(query)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Search results:", data); // Debugging
            resultsContainer.innerHTML = "";
            if (data.length === 0) {
                resultsContainer.innerHTML = '<div class="no-results">No results found</div>';
            } else {
                data.forEach(product => {
                    const resultItem = document.createElement('div');
                    resultItem.classList.add('result-item');
                    resultItem.innerHTML = `
                        <img src="${product.image_url}" alt="${product.name}" style="width: 50px; height: 50px; margin-right: 10px;">
                        <span>${product.name}</span>
                    `;
                    resultItem.onclick = () => {
                        window.location.href = `product.php?id=${product.id}`;
                    };
                    resultsContainer.appendChild(resultItem);
                });
            }
            resultsContainer.style.display = "block";
        })
        .catch(error => {
            console.error("Error fetching search results:", error);
            resultsContainer.innerHTML = '<div class="no-results">Error fetching results</div>';
            resultsContainer.style.display = "block";
        });
}

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

// Cart functions
function loadCartFromLocalStorage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartDisplay(cart);
}

function saveCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId, productName, buttonElement) {
    const varietySelect = buttonElement.closest('.product-info').querySelector('.variety-select');
    const varietyId = varietySelect.value;
    const varietyName = varietySelect.selectedOptions[0].text;
    const price = parseFloat(varietySelect.selectedOptions[0].dataset.price);

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.productId === productId && item.varietyId === varietyId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ productId, productName, varietyId, varietyName, price, quantity: 1 });
    }

    saveCartToLocalStorage(cart);
    updateCartDisplay(cart);
}

function updateCartDisplay(cart) {
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHTML = '<h2>Your Cart</h2>';

    if (cart.length === 0) {
        cartContainer.innerHTML += '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.productName} (${item.varietyName}) - ₹${item.price}</p>
            <div class="quantity-controls">
                <button onclick="changeQuantity('${item.productId}', '${item.varietyId}', -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity('${item.productId}', '${item.varietyId}', 1)">+</button>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalDisplay = document.createElement('p');
    totalDisplay.innerHTML = `Total: ₹${total}`;
    cartContainer.appendChild(totalDisplay);

    const checkoutButton = document.createElement('button');
    checkoutButton.classList.add('checkout-btn');
    checkoutButton.innerHTML = 'Checkout';
    checkoutButton.onclick = () => alert(`Total amount: ₹${total}`);
    cartContainer.appendChild(checkoutButton);
}

function changeQuantity(productId, varietyId, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.productId === productId && item.varietyId === varietyId);

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            const index = cart.indexOf(item);
            cart.splice(index, 1);
        }
    }

    saveCartToLocalStorage(cart);
    updateCartDisplay(cart);
}




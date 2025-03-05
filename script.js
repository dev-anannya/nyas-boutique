document.addEventListener("DOMContentLoaded", function () {
    fetchProducts();
});

async function fetchProducts() {
    try {
        const response = await fetch("http://localhost:8000/api/products.php");
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

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
                <button onclick="addToCart('${product.name}', this)">Add to Cart</button>
            </div>
        `;
        productContainer.innerHTML += productCard;
    });
}

let cart = [];
function addToCart(productName, button) {
    let select = button.previousElementSibling;
    let selectedOption = select.options[select.selectedIndex];
    let price = parseInt(selectedOption.getAttribute("data-price"));

    cart.push({ name: productName, variety: selectedOption.text, price: price });
    updateCart();
}

function updateCart() {
    const cartContainer = document.getElementById("cart");
    const totalContainer = document.getElementById("total");
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartContainer.innerHTML += `<div class="cart-item">${item.name} (${item.variety}) - ₹${item.price} <button onclick="removeFromCart(${index})">Remove</button></div>`;
    });

    totalContainer.innerText = "Total: ₹" + total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

document.addEventListener("DOMContentLoaded", function () {
    autoSlide(".best-sellers .carousel");
    autoSlide(".reviews .carousel");
});

function autoSlide(selector) {
    const carousel = document.querySelector(selector);
    setInterval(() => {
        carousel.scrollBy({ left: 220, behavior: "smooth" });
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
            carousel.scrollTo({ left: 0, behavior: "smooth" });
        }
    }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
    let searchIcon = document.getElementById("search-icon");
    let searchBox = document.getElementById("search-box");

    // Toggle search box visibility
    searchIcon.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent immediate closing when clicking icon
        searchBox.style.display = searchBox.style.display === "block" ? "none" : "block";
    });

    // Hide search box when clicking outside
    document.addEventListener("click", function (event) {
        if (!searchBox.contains(event.target) && event.target !== searchIcon) {
            searchBox.style.display = "none";
        }
    });

    // Redirect to cart page
    document.getElementById("cart-icon").addEventListener("click", function () {
        window.location.href = "cart.html"; // Update with your cart page link
    });
});

// 🌟 Best Seller Carousel Functionality

document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".carousel-track");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const items = document.querySelectorAll(".carousel-item");
    const itemWidth = items[0].offsetWidth + 20; // Including gap
    let index = 0;

    function updateCarousel() {
        track.style.transform = `translateX(-${index * itemWidth}px)`;
    }

    nextBtn.addEventListener("click", function () {
        if (index < items.length - 1) {
            index++;
        } else {
            index = 0; // Loop back to start
        }
        updateCarousel();
    });

    prevBtn.addEventListener("click", function () {
        if (index > 0) {
            index--;
        } else {
            index = items.length - 1; // Loop back to end
        }
        updateCarousel();
    });

    // Swipe support for touchscreens
    let startX;
    track.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    track.addEventListener("touchend", (e) => {
        let endX = e.changedTouches[0].clientX;
        if (startX > endX + 50) {
            nextBtn.click(); // Swipe left
        } else if (startX < endX - 50) {
            prevBtn.click(); // Swipe right
        }
    });
});
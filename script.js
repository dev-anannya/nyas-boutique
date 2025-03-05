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

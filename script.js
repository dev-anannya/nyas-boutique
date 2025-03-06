            document.addEventListener("DOMContentLoaded", function () {
                // loadCartFromLocalStorage();
                // setupSearch();

                const urlParams = new URLSearchParams(window.location.search);
                const category = urlParams.get("category") || "all";

                fetchProducts(category);
            });

            // async function fetchProducts(category) {
            //     try {
            //         const response = await fetch("products.php");
            //         if (!response.ok) throw new Error("Failed to fetch products");

            //         const products = await response.json();
            //         const filteredProducts = filterProductsByCategory(products, category);
            //         displayProducts(filteredProducts);
            //         document.getElementById("category-title").innerText = category;
            //     } catch (error) {
            //         console.error("Error fetching products:", error);
            //         document.getElementById("productGrid").innerHTML = `<p class="error">Failed to load products. Try again later.</p>`;
            //     }
            // }

            async function fetchProducts(category) {
                try {
                    console.log("Fetching products from products.php...");
                    
                    const response = await fetch("products.php");
                    console.log("Response status:", response.status);
            
                    if (!response.ok) throw new Error("Failed to fetch products");
            
                    const products = await response.json();
                    console.log("Products fetched:", products); // Debugging
            
                    const filteredProducts = filterProductsByCategory(products, category);
                    displayProducts(filteredProducts);
                    document.getElementById("category-title").innerText = category;
                } catch (error) {
                    console.error("Error fetching products:", error);
                    document.getElementById("productGrid").innerHTML = `<p class="error">Failed to load products. Try again later.</p>`;
                }
            }
            

            function filterProductsByCategory(products, category) {
                if (category === "all") {
                    return products;
                }
                return products.filter(product => product.category === category);
            }

            function displayProducts(products) {
                const productGrid = document.getElementById("productGrid");
                productGrid.innerHTML = "";

                products.forEach(product => {
                    const productCard = document.createElement("div");
                    productCard.classList.add("product-card");
                    productCard.innerHTML = `
                        <div class="product-image">
                            <img src="${product.image_url}" alt="${product.name}">
                        </div>
                        <div class="product-info">
                            <h3>${product.name}</h3>
                            <p>Category: ${product.category}</p>
                            <select class="variety-select" onchange="updatePrice(this)">
                                ${product.varieties.map(v => `<option value="${v.id}" data-price="${v.price}">${v.name} - ₹${v.price}</option>`).join("")}
                            </select>
                            <p class="price">Price: ₹${product.varieties[0].price}</p>
                            <button onclick="addToCart('${product.id}', '${product.name}', this)">Add to Cart</button>
                        </div>
                    `;
                    productGrid.appendChild(productCard);
                });
            }

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
                    return;
                }

                fetch(`api/search.php?q=${encodeURIComponent(query)}`)
                    .then(response => response.text())
                    .then(data => {
                        resultsContainer.innerHTML = data;
                    })
                    .catch(error => {
                        console.error("Error fetching search results:", error);
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
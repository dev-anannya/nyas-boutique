insert php
<?php
require './api/db.php'; 

require 'products.php'; // Include your product data

foreach ($products as $product) {
    // Insert into products table
    $stmt = $conn->prepare("INSERT INTO products (name, category, image_url) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $product['name'], $product['category'], $product['image_url']);
    $stmt->execute();

    // Get the last inserted product ID
    $product_id = $conn->insert_id;

    // Insert varieties
    foreach ($product['varieties'] as $variety) {
        $stmt = $conn->prepare("INSERT INTO product_varieties (product_id, name, price) VALUES (?, ?, ?)");
        $stmt->bind_param("isd", $product_id, $variety['name'], $variety['price']);
        $stmt->execute();
    }
}

echo "Data inserted successfully!";
?>
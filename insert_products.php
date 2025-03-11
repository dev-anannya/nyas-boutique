<?php
require './api/db.php'; 

require 'products.php'; 

foreach ($products as $product) {
    // Inserts into products table
    $stmt = $conn->prepare("INSERT INTO products (name, category, image_url) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $product['name'], $product['category'], $product['image_url']);
    $stmt->execute();

    // Gets the last inserted product ID
    $product_id = $conn->insert_id;

    // Inserts varieties
    foreach ($product['varieties'] as $variety) {
        $stmt = $conn->prepare("INSERT INTO product_varieties (product_id, name, price) VALUES (?, ?, ?)");
        $stmt->bind_param("isd", $product_id, $variety['name'], $variety['price']);
        $stmt->execute();
    }
}

echo "Data inserted successfully!";
?>

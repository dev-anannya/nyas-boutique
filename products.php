<?php
header("Content-Type: application/json");
require './api/db.php';

$category = isset($_GET['category']) ? trim($_GET['category']) : '';

$query = "
    SELECT p.id, p.name, p.category, p.image_url, v.id AS variety_id, v.name AS variety_name, v.price
    FROM products p
    LEFT JOIN product_varieties v ON p.id = v.product_id
    WHERE (:category = '' OR LOWER(p.category) = LOWER(:category))
";


if (!empty($category)) {
    $query .= "AND LOWER(p.category) = :category";
}

$stmt = $pdo->prepare($query);

if (!empty($category)) {
    $stmt->execute(['category' => strtolower($category)]);
} else {
    $stmt->execute();
}

$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Debugging: Log the results
error_log(json_encode($results));

$products = [];
foreach ($results as $row) {
    $productId = $row['id'];
    if (!isset($products[$productId])) {
        $products[$productId] = [
            'id' => $row['id'],
            'name' => $row['name'],
            'category' => $row['category'],
            'image_url' => $row['image_url'],
            'varieties' => []
        ];
    }
    if ($row['variety_id']) {
        $products[$productId]['varieties'][] = [
            'id' => $row['variety_id'],
            'name' => $row['variety_name'],
            'price' => $row['price']
        ];
    }
}
        echo json_encode(array_values($products));

// Debugging: Log the final products array
error_log(json_encode(array_values($products)));

?>
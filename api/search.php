<?php
header("Content-Type: application/json");
require 'db.php';

if (isset($_GET['q'])) {
    $searchTerm = strtolower(trim($_GET['q']));
    $stmt = $pdo->prepare("
        SELECT p.id, p.name, p.category, p.image_url, v.id AS variety_id, v.name AS variety_name, v.price
        FROM products p
        LEFT JOIN product_varieties v ON p.id = v.product_id
        WHERE LOWER(p.name) LIKE :searchTerm OR LOWER(p.category) LIKE :searchTerm
    ");
    $stmt->execute(['searchTerm' => '%' . $searchTerm . '%']);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

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
} else {
    echo json_encode([]);
}
?>
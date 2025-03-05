<?php
header("Content-Type: application/json");

$products = [
    [
        "id" => 1,
        "name" => "Coffee",
        "category" => "Beverages",
        "image_url" => "https://via.placeholder.com/150",
        "varieties" => [
            ["id" => 101, "name" => "Small", "price" => 50],
            ["id" => 102, "name" => "Medium", "price" => 100],
            ["id" => 103, "name" => "Large", "price" => 150]
        ]
    ],
    [
        "id" => 2,
        "name" => "Tea",
        "category" => "Beverages",
        "image_url" => "https://via.placeholder.com/150",
        "varieties" => [
            ["id" => 201, "name" => "Small", "price" => 40],
            ["id" => 202, "name" => "Medium", "price" => 80],
            ["id" => 203, "name" => "Large", "price" => 120]
        ]
    ]
];

echo json_encode($products);
?>

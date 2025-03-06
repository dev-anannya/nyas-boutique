
<?php
require 'db.php';

if (isset($_GET['q'])) {
    $searchTerm = htmlspecialchars($_GET['q']);
    $stmt = $pdo->prepare("SELECT * FROM products WHERE name LIKE :searchTerm OR description LIKE :searchTerm");
    $stmt->execute(['searchTerm' => '%' . $searchTerm . '%']);
    $results = $stmt->fetchAll();

    if ($results) {
        foreach ($results as $product) {
            echo '<div class="product">';
            echo '<h3>' . htmlspecialchars($product['name']) . '</h3>';
            echo '<p>' . htmlspecialchars($product['description']) . '</p>';
            echo '<p>Price: $' . htmlspecialchars($product['price']) . '</p>';
            echo '</div>';
        }
    } else {
        echo '<p>No products found.</p>';
    }
}
?>

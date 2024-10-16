<?php
include './db/config.php';

$stmt = $pdo->query("SELECT * FROM convidados ORDER BY nome ASC");
$convidados = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($convidados);
?>

<?php
$host = '77.37.40.68';
$port = '3307';  // Porta externa a interna e padrao 3306
$dbname = '360brave';
$username = 'root';
$password = 'Senhafacil123@';

try {
    // Inclua a porta na string de conexão PDO
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexão bem-sucedida!";
} catch (PDOException $e) {
    echo "Erro na conexão com o banco de dados: " . $e->getMessage();
}
?>

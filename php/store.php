<?php
$servername = "360brave_controllween-db";
$username = "root";
$password = "Senhafacil123@";
$dbname = "360brave";

// Conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
  die("Conexão falhou: " . $conn->connect_error);
}

// Inserir dados
$name = $_POST['name'];
$phone = $_POST['phone'];
$qr_code = $_POST['qr_code'];

$sql = "INSERT INTO people (name, phone, qr_code) VALUES ('$name', '$phone', '$qr_code')";

if ($conn->query($sql) === TRUE) {
  echo "Cadastro realizado com sucesso!";
} else {
  echo "Erro: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "halloween_party";

// Conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
  die("Conexão falhou: " . $conn->connect_error);
}

// QR Code escaneado
$qr_code = $_POST['qr_code'];

// Verificar se o QR Code existe no banco de dados
$sql = "SELECT * FROM people WHERE qr_code = '$qr_code'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Atualizar a confirmação de presença
    $sql_update = "UPDATE people SET presence_confirmed = TRUE WHERE qr_code = '$qr_code'";
    if ($conn->query($sql_update) === TRUE) {
        echo "Presença confirmada!";
    } else {
        echo "Erro ao confirmar presença: " . $conn->error;
    }
} else {
    echo "QR Code não encontrado!";
}

$conn->close();
?>

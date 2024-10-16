<?php
include './db/config.php';
include 'cors.php';

$id = $_GET['id'];

$stmt = $pdo->prepare("SELECT * FROM convidados WHERE id = :id");
$stmt->bindParam(':id', $id);
$stmt->execute();

$convidado = $stmt->fetch(PDO::FETCH_ASSOC);

if ($convidado) {
    if ($convidado['validado'] == 'no') {
        $update = $pdo->prepare("UPDATE convidados SET validado = 'yes' WHERE id = :id");
        $update->bindParam(':id', $id);
        $update->execute();
        echo json_encode(["message" => "Convidado validado com sucesso!", "nome" => $convidado['nome']]);
    } else {
        echo json_encode(["message" => "Usuário já validado!"]);
    }
} else {
    echo json_encode(["message" => "Convidado não encontrado."]);
}
?>

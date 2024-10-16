<?php
include './db/config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['nome']) && isset($data['telefone'])) {
    $stmt = $pdo->prepare("INSERT INTO convidados (nome, telefone) VALUES (:nome, :telefone)");
    $stmt->bindParam(':nome', $data['nome']);
    $stmt->bindParam(':telefone', $data['telefone']);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Convidado cadastrado!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Erro ao cadastrar convidado."]);
    }
}
?>

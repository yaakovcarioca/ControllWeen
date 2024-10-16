<?php
// Inclua a biblioteca phpqrcode
include './phpqrcode/qrlib.php';

// Gera o QR Code para um URL
$id = $_GET['id'];
$url = "https://controllween.360brave.com/$id";

// Gerar o QR Code com base no URL
QRcode::png($url);
?>

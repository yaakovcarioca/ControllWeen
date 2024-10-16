const express = require('express');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Rota para gerar e salvar QR Code
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const qrText = `https://360brave-controllween-api-360.370fnn.easypanel.host/validar?id=${id}`;
  const qrImagePath = path.join(__dirname, `../public/qrcodes/${id}.png`);

  // Gera o QR Code e salva como imagem PNG
  QRCode.toFile(qrImagePath, qrText, (err) => {
    if (err) {
      console.error('Erro ao salvar QR Code:', err);
      return res.status(500).json({ success: false, message: 'Erro ao salvar QR Code' });
    }

    // Retorna a URL da imagem do QR Code
    const qrCodeUrl = `https://360brave-controllween-api-360.370fnn.easypanel.host/public/qrcodes/${id}.png`;
    res.json({ success: true, qrcode: qrCodeUrl });
  });
});

module.exports = router;

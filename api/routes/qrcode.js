const express = require('express');
const QRCode = require('qrcode');
const router = express.Router();

// Rota para gerar QR Code com base no ID do convidado
router.get('/:id', (req, res) => {
  const { id } = req.params;

  // Verifica se o ID foi fornecido e é um número válido
  if (!id) {
    return res.status(400).json({ success: false, message: 'ID é obrigatório' });
  }

  // Texto que será embutido no QR Code, apontando para a rota de validação
  const qrText = `https://360brave-controllween-api-360.370fnn.easypanel.host/validar?id=${id}`;

  // Gera o QR Code como uma Data URL (base64)
  QRCode.toDataURL(qrText, (err, url) => {
    if (err) {
      console.error('Erro ao gerar QR Code:', err);
      return res.status(500).json({ success: false, message: 'Erro ao gerar QR Code' });
    }

    // Retorna o QR Code como uma imagem base64
    res.json({ success: true, qrcode: url });
  });
});

module.exports = router;

const express = require('express');
const QRCode = require('qrcode');
const router = express.Router();

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const qrText = `https://meu-backend.com/validar?id=${id}`;

  QRCode.toDataURL(qrText, (err, url) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro ao gerar QR Code' });
    }
    res.json({ success: true, qrcode: url });
  });
});

module.exports = router;

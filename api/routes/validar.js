const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ success: false, message: 'ID é obrigatório' });
  }

  // ... Lógica de validação aqui (igual ao exemplo anterior) ...

  res.json({ success: true, message: `Olá, ${convidado.nome}, boa festa!` });
});

module.exports = router;

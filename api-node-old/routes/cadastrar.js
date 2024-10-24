const express = require('express');
const router = express.Router();
const db = require('../db'); // Importe a conexão com o banco, se necessário

router.post('/', (req, res) => {
  const { nome, telefone } = req.body;
  if (!nome || !telefone) {
    return res.status(400).json({ success: false, message: 'Nome e telefone são obrigatórios' });
  }

  const query = 'INSERT INTO convidados (nome, telefone, validado) VALUES (?, ?, "no")';
  db.query(query, [nome, telefone], (err) => {
    if (err) {
      console.error('Erro ao cadastrar convidado:', err);
      return res.status(500).json({ success: false, message: 'Erro ao cadastrar convidado' });
    }
    res.json({ success: true, message: 'Convidado cadastrado com sucesso!' });
  });
});

module.exports = router;

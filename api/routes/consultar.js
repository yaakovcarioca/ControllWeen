const express = require('express');
const router = express.Router();
const db = require('../db'); // Importa a conexão com o banco de dados

// Rota para listar todos os convidados
router.get('/', (req, res) => {
  const query = 'SELECT * FROM convidados ORDER BY nome ASC';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar convidados:', err);
      return res.status(500).json({ success: false, message: 'Erro ao buscar convidados' });
    }

    // Retorna os convidados como um array
    res.json({ success: true, convidados: results });
  });
});

module.exports = router;

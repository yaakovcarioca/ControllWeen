const express = require('express');
const router = express.Router();
const db = require('../db');

// Rota para contar usuários cadastrados e validados
router.get('/', (req, res) => {
  const queryTotal = 'SELECT COUNT(*) AS total FROM convidados';
  const queryValidados = 'SELECT COUNT(*) AS validados FROM convidados WHERE validado = "yes"';

  // Executa ambas as consultas e retorna os resultados
  db.query(queryTotal, (err, totalResults) => {
    if (err) {
      console.error('Erro ao contar usuários cadastrados:', err);
      return res.status(500).json({ success: false, message: 'Erro ao contar usuários cadastrados' });
    }

    db.query(queryValidados, (err, validadosResults) => {
      if (err) {
        console.error('Erro ao contar usuários validados:', err);
        return res.status(500).json({ success: false, message: 'Erro ao contar usuários validados' });
      }

      const total = totalResults[0].total;
      const validados = validadosResults[0].validados;

      res.json({ success: true, total, validados });
    });
  });
});

module.exports = router;

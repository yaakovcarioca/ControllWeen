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

// Rota para excluir um convidado pelo ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    // Verifica se o ID foi fornecido
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }
  
    // Exclui o convidado do banco de dados
    const query = 'DELETE FROM convidados WHERE id = ?';
    db.query(query, [id], (err) => {
      if (err) {
        console.error('Erro ao excluir convidado:', err);
        return res.status(500).json({ success: false, message: 'Erro ao excluir convidado' });
      }
  
      res.json({ success: true, message: 'Convidado excluído com sucesso.' });
    });
  });
  

module.exports = router;

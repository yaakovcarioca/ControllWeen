const fs = require('fs');
const path = require('path');
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

// Rota para excluir um convidado e o QR Code associado
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  // Obter informações do convidado antes de excluí-lo
  const selectQuery = 'SELECT nome FROM convidados WHERE id = ?';
  db.query(selectQuery, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar convidado:', err);
      return res.status(500).json({ success: false, message: 'Erro ao buscar convidado' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Convidado não encontrado' });
    }

    const convidado = results[0];
    const qrCodeFilePath = path.join(__dirname, '..', 'public', 'qrcodes', `${id}.png`); // Ajuste o caminho conforme sua estrutura de pastas

    // Excluir o convidado do banco de dados
    const deleteQuery = 'DELETE FROM convidados WHERE id = ?';
    db.query(deleteQuery, [id], (err) => {
      if (err) {
        console.error('Erro ao excluir convidado:', err);
        return res.status(500).json({ success: false, message: 'Erro ao excluir convidado' });
      }

      // Excluir o arquivo do QR Code associado
      fs.unlink(qrCodeFilePath, (err) => {
        if (err) {
          console.error('Erro ao excluir o QR Code:', err);
          return res.status(500).json({ success: false, message: 'Erro ao excluir o QR Code associado' });
        }

        res.json({ success: true, message: 'Convidado e QR Code excluídos com sucesso.' });
      });
    });
  });
});
  

module.exports = router;

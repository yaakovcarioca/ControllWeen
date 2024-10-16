const express = require('express');
const router = express.Router();
const db = require('../db');

// Rota para validar um convidado pelo ID
router.post('/', (req, res) => {
  const { id } = req.body;

  // Verifica se o ID foi fornecido
  if (!id) {
    return res.status(400).json({ success: false, message: 'ID é obrigatório' });
  }

  // Consulta para verificar se o convidado existe e seu status de validação
  const query = 'SELECT nome, validado FROM convidados WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar convidado:', err);
      return res.status(500).json({ success: false, message: 'Erro ao buscar convidado' });
    }

    // Verifica se o convidado foi encontrado
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Convidado não encontrado' });
    }

    const convidado = results[0];

    // Verifica se o convidado já foi validado
    if (convidado.validado === 'yes') {
      return res.status(400).json({ success: false, message: 'Usuário já validado!' });
    }

    // Atualiza o status de validação para "yes"
    const updateQuery = 'UPDATE convidados SET validado = "yes" WHERE id = ?';
    db.query(updateQuery, [id], (err) => {
      if (err) {
        console.error('Erro ao validar convidado:', err);
        return res.status(500).json({ success: false, message: 'Erro ao validar convidado' });
      }

      // Retorna sucesso com mensagem personalizada
      res.json({ success: true, message: `Olá, ${convidado.nome}, boa festa!` });
    });
  });
});

module.exports = router;

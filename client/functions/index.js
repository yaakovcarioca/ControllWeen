const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();
const db = admin.firestore();

// Função de exemplo para validação de convidados
exports.validateConvidado = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send('Método não permitido');
    }

    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }

    try {
      const convidadoRef = db.collection('convidados').doc(id);
      const doc = await convidadoRef.get();

      if (!doc.exists) {
        return res.status(404).json({ success: false, message: 'Convidado não encontrado' });
      }

      const convidadoData = doc.data();
      if (convidadoData.validado) {
        return res.status(400).json({ success: false, message: 'Convidado já validado' });
      }

      // Atualizar status de validação
      await convidadoRef.update({ validado: true });

      return res.json({ success: true, message: `Olá, ${convidadoData.nome}, você foi validado!` });
    } catch (error) {
      console.error('Erro ao validar convidado:', error);
      return res.status(500).json({ success: false, message: 'Erro ao validar convidado' });
    }
  });
});

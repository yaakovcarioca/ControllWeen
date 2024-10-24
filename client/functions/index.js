/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const QRCode = require('qrcode');
const cors = require('cors')({ origin: ['https://controllween.360brave.com', 'http://localhost:5173'] });

// Inicializar o Firebase Admin
admin.initializeApp();
const db = admin.firestore();

exports.generateQrCode = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send('Método não permitido');
    }

    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: 'ID é obrigatório' });
    }

    try {
      const qrCodeData = `https://controllween.360brave.com/validar?id=${id}`;
      const qrCodeUrl = await QRCode.toDataURL(qrCodeData);

      await db.collection('convidados').doc(id).update({
        qrCodeUrl,
      });

      return res.json({ success: true, qrcodeUrl: qrCodeUrl });
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
      return res.status(500).json({ success: false, message: 'Erro ao gerar QR Code' });
    }
  });
});




// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

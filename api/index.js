const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const QRCode = require('qrcode');
require('dotenv').config();

const cadastrarRoute = require('./routes/cadastrar');
const validarRoute = require('./routes/validar');
const qrcodeRoute = require('./routes/qrcode');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para CORS e parsing de JSON
app.use(cors({
  origin: 'https://controllween.360brave.com', // Substitua pela URL do seu frontend
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Rotas
app.use('/cadastrar', cadastrarRoute);
app.use('/validar', validarRoute);
app.use('/gerar-qrcode', qrcodeRoute);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

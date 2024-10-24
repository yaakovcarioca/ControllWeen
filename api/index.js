const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const QRCode = require('qrcode');
const path = require('path');
require('dotenv').config();

const cadastrarRoute = require('./routes/cadastrar');
const validarRoute = require('./routes/validar');
const qrcodeRoute = require('./routes/qrcode');
const consultarRoute = require('./routes/consultar'); 
const contarRoute = require('./routes/contar');

const app = express();
const PORT = process.env.PORT;

// Middleware para CORS
app.use(cors({
  origin: 'https://controllween.360brave.com', // URL do frontend
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Se precisar enviar cookies de autenticação
}));


app.use(express.json());

// Rotas
app.use('/cadastrar', cadastrarRoute);
app.use('/validar', validarRoute);
app.use('/gerar-qrcode', qrcodeRoute);
app.use('/convidados', consultarRoute);
app.use('/convidados/contar', contarRoute);

// Permite servir arquivos estáticos da pasta 'public'
app.use('/public', express.static(path.join(__dirname, 'public')));

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

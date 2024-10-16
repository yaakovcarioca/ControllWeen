const express = require('express');
const app = express();
const cadastrarRoute = require('./routes/cadastrar');
const validarRoute = require('./routes/validar');
const qrcodeRoute = require('./routes/qrcode');

app.use(express.json());
app.use('/cadastrar', cadastrarRoute);
app.use('/validar', validarRoute);
app.use('/gerar-qrcode', qrcodeRoute);

// Middleware para CORS e parsing de JSON
app.use(cors({
  origin: 'https://controllween.360brave.com/',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

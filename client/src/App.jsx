// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Cadastrar from './pages/Cadastrar';
import Consultar from './pages/Consultar';
import Validar from './pages/Validar';
import ViewQr from './pages/ViewQr';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastrar" element={<Cadastrar />} />
          <Route path="/consultar" element={<Consultar />} />
          <Route path="/validar" element={<Validar />} />
          <Route path="/view-qr/:id" element={<ViewQr />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

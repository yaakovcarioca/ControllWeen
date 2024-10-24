// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cadastrar from './pages/Cadastrar';
import Consultar from './pages/Consultar';
import Validar from './pages/Validar';
import Header from './components/Header';
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
        </Routes>
      </main>
    </Router>
  );
}

export default App;

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cadastrar">Cadastrar</Link></li>
          <li><Link to="/consultar">Consultar</Link></li>
          <li><Link to="/validar">Validar</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

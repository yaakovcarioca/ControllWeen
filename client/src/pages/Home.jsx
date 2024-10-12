import React from 'react';
import './Home.css'; // Arquivo CSS para adicionar os efeitos visuais
import Imagem1 from "../assets/imagem1.png"

function Home() {
  return (
    <div className="home-container">
      <h1 className="controllween-title">ControllWeen</h1>
      <div className="floating-images">
        <img src={Imagem1} alt="decoration1" className="float" />
      </div>
    </div>
  );
}

export default Home;

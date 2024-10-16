import React, { useState } from 'react';
import QrScanner from '@react-qr-scanner';

function Validar() {
  const [mensagem, setMensagem] = useState('');

  const handleScan = (data) => {
    if (data) {
      fetch(`../../../api/validar.php?id=${data.text}`)
        .then((response) => response.json())
        .then((result) => {
          if (result.message) {
            setMensagem(result.message);
          }
        })
        .catch((error) => {
          console.error('Erro ao validar convidado:', error);
          setMensagem('Erro ao validar o convidado.');
        });
    }
  };

  const handleError = (err) => {
    console.error('Erro ao ler QR Code:', err);
  };

  return (
    <div>
      <h2>Validar QR Code</h2>
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default Validar;

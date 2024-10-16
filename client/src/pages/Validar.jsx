import React, { useState } from 'react';
import { QrReader } from 'react-qr-scanner';

function Validar() {
  const [mensagem, setMensagem] = useState('');

  const handleScan = (result) => {
    if (result) {
      fetch(`/api/validar.php?id=${result.text}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            setMensagem(data.message);
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
      <QrReader
        onResult={handleScan}
        onError={handleError}
        style={{ width: '100%' }}
      />
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default Validar;

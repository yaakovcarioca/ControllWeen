import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

function Validar() {
  const [mensagem, setMensagem] = useState('');

  const handleScan = (data) => {
    if (data) {
      // Enviar o ID lido do QR Code para o backend
      fetch(`../../../api/validar.php?id=${data}`)
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
      <QrReader delay={300} onError={handleError} onScan={handleScan} />
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default Validar;

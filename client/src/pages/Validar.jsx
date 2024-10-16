import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

function Validar() {
  const [mensagem, setMensagem] = useState('');
  const qrCodeRef = useRef(null);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("qr-reader");

    html5QrCode.start(
      { facingMode: "environment" }, // Pode ser 'user' para câmera frontal
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      (decodedText) => {
        // Parar o escaneamento após a leitura bem-sucedida
        html5QrCode.stop().then(() => {
          // Fazer a requisição para validar o ID obtido do QR Code
          fetch(`../../../api/validar.php?id=${decodedText}`)
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
        });
      },
      (errorMessage) => {
        console.warn('Erro na leitura do QR Code:', errorMessage);
      }
    );

    // Cleanup para parar o leitor de QR Code quando o componente for desmontado
    return () => {
      html5QrCode.stop().catch((err) => console.error('Erro ao parar QR Code Reader:', err));
    };
  }, []);

  return (
    <div>
      <h2>Validar QR Code</h2>
      <div id="qr-reader" style={{ width: '300px' }}></div>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default Validar;

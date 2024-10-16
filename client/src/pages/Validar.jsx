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
        try {
          // Parar o escaneamento após a leitura bem-sucedida
          html5QrCode.stop().then(() => {
            // Supondo que o QR Code contenha uma URL com o ID como parâmetro, por exemplo: https://.../validar?id=123
            const url = new URL(decodedText);
            const convidadoId = url.searchParams.get('id');

            // Verifica se o ID foi encontrado no QR Code existia um erro aqui
            if (!convidadoId) {
              setMensagem('QR Code inválido. ID não encontrado.');
              return;
            }

            // Fazer a requisição para validar o ID obtido do QR Code
            fetch('https://360brave-controllween-api-360.370fnn.easypanel.host/validar', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: convidadoId }), // ID do convidado vindo do QR Code
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.success) {
                  setMensagem(data.message);
                } else {
                  setMensagem(data.message || 'Erro ao validar o convidado.');
                }
              })
              .catch((error) => {
                console.error('Erro ao validar:', error);
                setMensagem('Erro ao validar o convidado.');
              });
          });
        } catch (error) {
          console.error('Erro ao processar o QR Code:', error);
          setMensagem('Erro ao processar o QR Code.');
        }
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

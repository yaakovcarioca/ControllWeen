import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

function Validar() {
  const [mensagem, setMensagem] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [processando, setProcessando] = useState(false);
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
            setProcessando(true); // Exibe mensagem de "Processando..."

            try {
              // Supondo que o QR Code contenha uma URL com o ID como parâmetro, por exemplo: https://.../validar?id=123
              const url = new URL(decodedText);
              const convidadoId = url.searchParams.get('id');

              // Verifica se o ID foi encontrado no QR Code
              if (!convidadoId) {
                setMensagem('QR Code inválido. ID não encontrado.');
                setModalVisible(true);
                setProcessando(false);
                return;
              }

              // Fazer a requisição para validar o ID obtido do QR Code
              fetch('https://360brave-controllween-api-360.370fnn.easypanel.host/validar', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: convidadoId }),
              })
                .then((response) => response.json())
                .then((data) => {
                  setMensagem(data.message || 'Erro ao validar o convidado.');
                  setModalVisible(true);
                  setProcessando(false);
                })
                .catch((error) => {
                  console.error('Erro ao validar:', error);
                  setMensagem('Erro ao validar o convidado.');
                  setModalVisible(true);
                  setProcessando(false);
                });
            } catch (error) {
              console.error('Erro ao processar a URL do QR Code:', error);
              setMensagem('Erro ao processar a URL do QR Code.');
              setModalVisible(true);
              setProcessando(false);
            }
          });
        } catch (error) {
          console.error('Erro ao processar o QR Code:', error);
          setMensagem('Erro ao processar o QR Code.');
          setModalVisible(true);
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

  // Função para fechar o modal
  const closeModal = () => {
    setModalVisible(false);
    setMensagem('');
  };

  return (
    <div>
      <h2>Validar QR Code</h2>
      <div id="qr-reader" style={{ width: '300px' }}></div>
      {processando && <p>Processando...</p>}

      {/* Modal */}
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <p style={{ color: 'black' }}>{mensagem}</p>
            <button onClick={closeModal}>Fechar</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 5px;
          text-align: center;
        }
        .modal-content p {
          margin-bottom: 10px;
          color: black;
        }
        .modal-content button {
          padding: 10px 20px;
          border: none;
          background: #007bff;
          color: white;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default Validar;

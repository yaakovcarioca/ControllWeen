import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function Validar() {
  const [mensagem, setMensagem] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [processando, setProcessando] = useState(false);
  const qrCodeRef = useRef(null);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("qr-reader");

    html5QrCode.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      (decodedText) => {
        try {
          // Parar o escaneamento após a leitura bem-sucedida
          html5QrCode.stop().then(async () => {
            setProcessando(true);

            try {
              // Supondo que o QR Code contenha uma URL com o ID como parâmetro, por exemplo: https://.../validar?id=123
              const url = new URL(decodedText);
              const convidadoId = url.searchParams.get('id');

              if (!convidadoId) {
                setMensagem('QR Code inválido. ID não encontrado.');
                setModalVisible(true);
                setProcessando(false);
                return;
              }

              // Buscar o documento do convidado pelo ID no Firestore
              const docRef = doc(db, 'convidados', convidadoId);
              const docSnap = await getDoc(docRef);

              if (docSnap.exists()) {
                const convidado = docSnap.data();

                // Verificar se já foi validado
                if (convidado.validado) {
                  setMensagem('Usuário já validado!');
                } else {
                  // Atualizar o campo "validado" para "true"
                  await updateDoc(docRef, { validado: true });
                  setMensagem(`Olá, ${convidado.nome}, boa festa!`);
                }
              } else {
                setMensagem('Convidado não encontrado.');
              }

              setModalVisible(true);
              setProcessando(false);
            } catch (error) {
              console.error('Erro ao validar convidado:', error);
              setMensagem('Erro ao validar o convidado.');
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

  // Função para fechar o modal e reiniciar a leitura do QR Code
  const closeModal = () => {
    setModalVisible(false);
    setMensagem('');
    setProcessando(false);

    // Reinicia o QR code scanner
    const html5QrCode = new Html5Qrcode("qr-reader");
    html5QrCode.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      () => {},
      (errorMessage) => {
        console.warn('Erro na leitura do QR Code:', errorMessage);
      }
    ).catch((err) => {
      console.error('Erro ao reiniciar o QR Code Reader:', err);
    });
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
          background: #1a1a1a;
          padding: 20px;
          border-radius: 5px;
          text-align: center;
          color: #ffffff;
        }
        .modal-content p {
          margin-bottom: 10px;
          color: #ffffff;
        }
        .modal-content button {
          padding: 10px 20px;
          border: none;
          background: #007bff;
          color: white;
          border-radius: 5px;
          cursor: pointer;
        }
        .modal-content button:hover {
          background: #0056b3;
        }
      `}</style>
    </div>
  );
}

export default Validar;

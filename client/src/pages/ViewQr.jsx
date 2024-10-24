import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import QRCode from 'qrcode'; // Importa a biblioteca qrcode

function ViewQr() {
  const { id } = useParams();
  const [qrUrl, setQrUrl] = useState('');
  const [mensagem, setMensagem] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchQrUrl = async () => {
      try {
        const docRef = doc(db, 'convidados', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setQrUrl(data.qrUrl);
        } else {
          setMensagem('QR Code não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar QR Code:', error);
        setMensagem('Erro ao buscar QR Code.');
      }
    };

    fetchQrUrl();
  }, [id]);

  useEffect(() => {
    if (qrUrl && canvasRef.current) {
      // Gera o QR code no canvas
      QRCode.toCanvas(canvasRef.current, qrUrl, { width: 256 }, (error) => {
        if (error) {
          console.error('Erro ao gerar QR code:', error);
          setMensagem('Erro ao gerar o QR code.');
        }
      });
    }
  }, [qrUrl]);

  return (
    <div>
      <h2>Seu QR Code</h2>
      {mensagem && <p>{mensagem}</p>}
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default ViewQr;

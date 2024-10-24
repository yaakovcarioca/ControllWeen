import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewQr() {
  const { id } = useParams();
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const fetchQrCode = async () => {
      const url = `https://controllween.360brave.com/qr-codes/${id}.png`;
      setQrCodeUrl(url);
    };

    fetchQrCode();
  }, [id]);

  return (
    <div>
      <h2>Seu QR Code</h2>
      {qrCodeUrl ? (
        <img src={qrCodeUrl} alt="QR Code" style={{ width: '300px', height: '300px' }} />
      ) : (
        <p>Carregando QR Code...</p>
      )}
    </div>
  );
}

export default ViewQr;

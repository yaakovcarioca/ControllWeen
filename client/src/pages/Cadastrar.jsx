import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import QRCode from 'qrcode';

function Cadastrar() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleCadastrar = async () => {
    if (!nome || !telefone) {
      setMensagem('Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Cria o novo documento no Firestore
      const docRef = await addDoc(collection(db, 'convidados'), {
        nome,
        telefone,
        validado: false,
      });

      // Gera a URL do QR code
      const qrCodeData = `https://controllween.360brave.com/validar?id=${docRef.id}`;

      // Gera o QR code em uma URL base64
      QRCode.toDataURL(qrCodeData, (err, url) => {
        if (err) {
          console.error('Erro ao gerar QR Code:', err);
          setMensagem('Erro ao gerar QR Code.');
          return;
        }

        // Cria um link para download do QR code gerado
        const link = document.createElement('a');
        link.href = url;
        link.download = `${docRef.id}.png`;
        link.click();

        setMensagem('Convidado cadastrado com sucesso! O QR Code foi gerado.');
      });

      setNome('');
      setTelefone('');
    } catch (error) {
      console.error('Erro ao cadastrar convidado:', error);
      setMensagem('Erro ao cadastrar convidado.');
    }
  };

  return (
    <div>
      <h2>Cadastrar Convidado</h2>
      {mensagem && <p>{mensagem}</p>}
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="text"
        placeholder="Telefone"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
      />
      <button onClick={handleCadastrar}>Cadastrar</button>
    </div>
  );
}

export default Cadastrar;

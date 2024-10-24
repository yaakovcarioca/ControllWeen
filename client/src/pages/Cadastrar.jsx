import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';

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

      // Gera a URL do QR code para esse convidado
      const qrCodeUrl = `https://controllween.360brave.com/validar?id=${docRef.id}`;

      // Atualiza o documento com a URL do QR code
      await updateDoc(doc(db, 'convidados', docRef.id), {
        qrUrl: qrCodeUrl,
      });

      setMensagem('Convidado cadastrado com sucesso!');
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

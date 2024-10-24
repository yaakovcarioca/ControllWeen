// src/pages/Cadastrar.jsx
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function Cadastrar() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleCadastro = async () => {
    if (!nome || !telefone) {
      setMensagem('Nome e telefone são obrigatórios!');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'convidados'), {
        nome,
        telefone,
        validado: false, // Inicia com a validação como falsa
      });
      setMensagem('Convidado cadastrado com sucesso!');
      setNome('');
      setTelefone('');
      console.log('Convidado cadastrado com ID:', docRef.id);
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
      <button onClick={handleCadastro}>Cadastrar</button>
    </div>
  );
}

export default Cadastrar;

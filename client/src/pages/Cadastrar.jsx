import React, { useState } from 'react';

function Cadastrar() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Preparar os dados a serem enviados
    const novoConvidado = { nome, telefone };

    // Chamar o endpoint de cadastro via POST
    fetch('./api/cadastrar.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoConvidado),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMensagem('Convidado cadastrado com sucesso!');
          // Limpar os campos após cadastro
          setNome('');
          setTelefone('');
        } else {
          setMensagem('Erro ao cadastrar o convidado.');
        }
      })
      .catch((error) => {
        console.error('Erro ao cadastrar:', error);
        setMensagem('Erro ao cadastrar o convidado.');
      });
  };

  return (
    <div>
      <h2>Cadastrar Convidado</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>
        <label>
          Telefone:
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </label>
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default Cadastrar;

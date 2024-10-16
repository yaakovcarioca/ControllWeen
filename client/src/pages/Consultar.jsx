import React, { useEffect, useState } from 'react';

function Consultar() {
  const [convidados, setConvidados] = useState([]);
  const [mensagem, setMensagem] = useState('');

  // Chamada à API para buscar todos os convidados
  useEffect(() => {
    fetch('https://controllween.360brave.com/api/convidados.php')
      .then((response) => response.json())
      .then((data) => setConvidados(data))
      .catch((error) => {
        console.error('Erro ao buscar convidados:', error);
        setMensagem('Erro ao carregar a lista de convidados.');
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      fetch(`https://controllween.360brave.com/api/excluir.php?id=${id}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setConvidados(convidados.filter((convidado) => convidado.id !== id));
            setMensagem('Convidado excluído com sucesso.');
          } else {
            setMensagem('Erro ao excluir o convidado.');
          }
        })
        .catch((error) => {
          console.error('Erro ao excluir convidado:', error);
          setMensagem('Erro ao excluir o convidado.');
        });
    }
  };

  return (
    <div>
      <h2>Lista de Convidados</h2>
      {mensagem && <p>{mensagem}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Ações</th>
            <th>Validado</th>
          </tr>
        </thead>
        <tbody>
          {convidados.map((convidado) => (
            <tr key={convidado.id}>
              <td>{convidado.id}</td>
              <td>{convidado.nome}</td>
              <td>{convidado.telefone}</td>
              <td>
                <button onClick={() => handleDelete(convidado.id)}>Excluir</button>
              </td>
              <td>{convidado.validado === 'yes' ? 'Sim' : 'Não'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Consultar;

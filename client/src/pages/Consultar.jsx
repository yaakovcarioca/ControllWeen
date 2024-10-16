import React, { useEffect, useState } from 'react';

function Consultar() {
  const [convidados, setConvidados] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [totalCadastrados, setTotalCadastrados] = useState(0);
  const [totalValidados, setTotalValidados] = useState(0);

  // Chamada à API para buscar todos os convidados e contar usuários
  useEffect(() => {
    fetch('https://360brave-controllween-api-360.370fnn.easypanel.host/convidados')
      .then((response) => response.json())
      .then((data) => setConvidados(data.convidados))
      .catch((error) => {
        console.error('Erro ao buscar convidados:', error);
        setMensagem('Erro ao carregar a lista de convidados.');
      });

    // Chamada à API para contar usuários cadastrados e validados
    fetch('https://360brave-controllween-api-360.370fnn.easypanel.host/convidados/contar')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setTotalCadastrados(data.total);
          setTotalValidados(data.validados);
        }
      })
      .catch((error) => {
        console.error('Erro ao contar usuários:', error);
        setMensagem('Erro ao contar os usuários.');
      });
  }, []);
  
  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      fetch(`https://360brave-controllween-api-360.370fnn.easypanel.host/convidados/${id}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Atualiza a lista de convidados após exclusão
            setConvidados(convidados.filter((convidado) => convidado.id !== id));
            setMensagem('Convidado excluído com sucesso.');
            // Atualiza o contador de cadastrados e validados
            setTotalCadastrados((prev) => prev - 1);
            if (convidado.validado === 'yes') {
              setTotalValidados((prev) => prev - 1);
            }
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

      {/* Informações sobre o número de usuários */}
      <div style={{ marginBottom: '20px' }}>
        <p>Usuários cadastrados: {totalCadastrados}</p>
        <p>Usuários validados: {totalValidados}</p>
      </div>

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

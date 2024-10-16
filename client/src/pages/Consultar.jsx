import React, { useEffect, useState } from 'react';

function Consultar() {
  const [convidados, setConvidados] = useState([]);
  const [mensagem, setMensagem] = useState('');

  // Chamada à API para buscar todos os convidados
  useEffect(() => {
    fetch('https://360brave-controllween-api-360.370fnn.easypanel.host/convidados', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar convidados');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setConvidados(data.convidados);
        } else {
          setMensagem('Erro ao carregar a lista de convidados.');
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar convidados:', error);
        setMensagem('Erro ao carregar a lista de convidados.');
      });
  }, []);
  
  // Função para excluir um convidado
  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      fetch(`https://360brave-controllween-api-360.370fnn.easypanel.host/convidados/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro ao excluir o convidado');
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            setConvidados((prevConvidados) => prevConvidados.filter((convidado) => convidado.id !== id));
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

  // Função para enviar QR code via WhatsApp
  const handleEnviarQR = (id, telefone) => {
    // Chama a API para gerar o QR Code
    fetch(`https://360brave-controllween-api-360.370fnn.easypanel.host/gerar-qrcode/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao gerar o QR Code');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          const qrCodeUrl = data.qrcode;
  
          // Monta a mensagem para enviar via WhatsApp
          const mensagem = `Olá, você está recebendo o seu QR Code para entrada na festa de Halloween. Guarde para garantir sua entrada.`;
  
          // Codifica a mensagem para ser usada na URL
          const mensagemCodificada = encodeURIComponent(mensagem);
  
          // Cria a URL do WhatsApp com a imagem anexada
          const whatsappUrl = `https://wa.me/${telefone}?text=${mensagemCodificada}%0A${qrCodeUrl}`;
  
          // Abre a URL do WhatsApp para enviar a mensagem
          window.open(whatsappUrl, '_blank');
        } else {
          setMensagem('Erro ao gerar o QR Code.');
        }
      })
      .catch((error) => {
        console.error('Erro ao gerar QR Code:', error);
        setMensagem('Erro ao gerar o QR Code.');
      });
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
            <th>Enviar QR</th>
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
              <td>
                <button onClick={() => handleEnviarQR(convidado.id, convidado.telefone)}>Enviar QR</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Consultar;

import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

function Consultar() {
  const [convidados, setConvidados] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [totalCadastrados, setTotalCadastrados] = useState(0);
  const [totalValidados, setTotalValidados] = useState(0);

  // Função para buscar todos os convidados do firestore
  useEffect(() => {
    const fetchConvidados = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'convidados'));
        const convidadosData = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Captura o ID do documento
          ...doc.data(), // Captura os dados do documento (nome, telefone, validado)
        }));

        setConvidados(convidadosData);
        setTotalCadastrados(convidadosData.length);
        setTotalValidados(convidadosData.filter((convidado) => convidado.validado).length);
      } catch (error) {
        console.error('Erro ao buscar convidados:', error);
        setMensagem('Erro ao carregar a lista de convidados.');
      }
    };

    fetchConvidados();
  }, []);

  // Função para enviar o QR Code via WhatsApp
  const handleSendQr = (id, telefone) => {
    const viewQrUrl = `https://controllween-api.web.app/view-qr/${id}`;
    const message = `Olá, você está recebendo o seu QR Code para entrada na festa de Halloween. Acesse seu QR Code aqui: ${viewQrUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(message)}`;
  
    window.open(whatsappUrl, '_blank');
  };

  // Função para excluir um convidado
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      try {
        await deleteDoc(doc(db, 'convidados', id));
        setConvidados(convidados.filter((convidado) => convidado.id !== id));
        setMensagem('Convidado excluído com sucesso.');
        setTotalCadastrados((prev) => prev - 1);
        if (convidados.find((convidado) => convidado.id === id).validado) {
          setTotalValidados((prev) => prev - 1);
        }
      } catch (error) {
        console.error('Erro ao excluir convidado:', error);
        setMensagem('Erro ao excluir o convidado.');
      }
    }
  };

  return (
    <div>
      <h2>Lista de Convidados</h2>
      {mensagem && <p>{mensagem}</p>}

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
                <button onClick={() => handleSendQr(convidado.id, convidado.telefone)}>Enviar QR</button>
              </td>
              <td>{convidado.validado ? 'Sim' : 'Não'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Consultar;

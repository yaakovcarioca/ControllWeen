// src/pages/Consultar.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../firebase';

function Consultar() {
  const [convidados, setConvidados] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [totalCadastrados, setTotalCadastrados] = useState(0);
  const [totalValidados, setTotalValidados] = useState(0);

  // Buscar todos os convidados e contar usuários
  useEffect(() => {
    const fetchConvidados = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'convidados'));
        const convidadosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setConvidados(convidadosData);
        setTotalCadastrados(convidadosData.length);
        setTotalValidados(convidadosData.filter((c) => c.validado).length);
      } catch (error) {
        console.error('Erro ao buscar convidados:', error);
        setMensagem('Erro ao carregar a lista de convidados.');
      }
    };

    fetchConvidados();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      try {
        await deleteDoc(doc(db, 'convidados', id));
        setConvidados((prev) => prev.filter((convidado) => convidado.id !== id));
        setMensagem('Convidado excluído com sucesso.');
        setTotalCadastrados((prev) => prev - 1);
      } catch (error) {
        console.error('Erro ao excluir convidado:', error);
        setMensagem('Erro ao excluir o convidado.');
      }
    }
  };

  const handleSendQr = async (id, telefone) => {
    try {
      const generateQrCodeFunction = httpsCallable(functions, 'generateQrCode');
      const result = await generateQrCodeFunction({ id });
      const qrCodeUrl = result.data.qrCodeUrl;
      const message = `Olá, você está recebendo o seu QR Code para entrada na festa de Halloween. Guarde para garantir sua entrada. Acesse seu QR Code aqui: ${qrCodeUrl}`;
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      console.error('Erro ao gerar e enviar QR Code:', error);
      setMensagem('Erro ao gerar e enviar o QR Code.');
    }
  };

  return (
    <div>
      <h2>Lista de Convidados</h2>
      {mensagem && <p>{mensagem}</p>}
      <div>
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

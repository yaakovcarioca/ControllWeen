import React, { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [qrCode, setQrCode] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (name === '' || phone === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const firstName = name.split(' ')[0];
    
    // Gerar QR Code com a primeira parte do nome
    setQrCode(firstName);

    // Enviar dados para o backend PHP
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('qr_code', firstName);

    try {
      const response = await fetch('http://localhost/server/store.php', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.text();
      alert(result);
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  };

  return (
    <div>
      <h1>Cadastro de Pessoa</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        
        <label htmlFor="phone">Telefone:</label>
        <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />

        <button type="submit">Cadastrar e Gerar QR Code</button>
      </form>
      
      {qrCode && (
        <div>
          <h3>QR Code Gerado:</h3>
          <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${qrCode}&size=100x100`} alt="QR Code" />
        </div>
      )}
    </div>
  );
};

export default Register;

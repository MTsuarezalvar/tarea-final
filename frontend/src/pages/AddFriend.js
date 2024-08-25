import React, { useState } from 'react';
import axios from 'axios';

function AddFriend() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/friends/', { email }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Amigo añadido con éxito');
    } catch (error) {
      console.error(error);
      alert('Error al añadir amigo');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email del Amigo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Añadir Amigo</button>
    </form>
  );
}

export default AddFriend;

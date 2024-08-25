import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditGift({ match }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [price, setPrice] = useState('');
  const { id } = match.params;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchGift = async () => {
      try {
        const response = await axios.get(`/presents/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setName(response.data.name);
        setDescription(response.data.description);
        setUrl(response.data.url);
        setPrice(response.data.price);
      } catch (error) {
        console.error(error);
        alert('Error al cargar el regalo');
      }
    };

    fetchGift();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/presents/${id}`, { name, description, url, price }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Regalo modificado con éxito');
    } catch (error) {
      console.error(error);
      alert('Error al modificar el regalo');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del Regalo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <button type="submit">Actualizar Regalo</button>
    </form>
  );
}

export default EditGift;

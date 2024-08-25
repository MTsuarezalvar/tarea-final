import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewGifts() {
  const [gifts, setGifts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const response = await axios.get('/presents/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGifts(response.data);
      } catch (error) {
        console.error(error);
        alert('Error al cargar los regalos');
      }
    };

    fetchGifts();
  }, [token]);

  return (
    <div>
      <h1>Mis Regalos</h1>
      <ul>
        {gifts.map(gift => (
          <li key={gift.id}>
            <h2>{gift.name}</h2>
            <p>{gift.description}</p>
            <a href={gift.url}>Ver Más</a>
            <p>Precio: ${gift.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewGifts;

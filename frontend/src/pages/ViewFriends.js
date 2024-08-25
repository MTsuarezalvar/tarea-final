import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewFriends() {
  const [friends, setFriends] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get('/friends/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFriends(response.data);
      } catch (error) {
        console.error(error);
        alert('Error al cargar amigos');
      }
    };

    fetchFriends();
  }, [token]);

  return (
    <div>
      <h1>Mis Amigos</h1>
      <ul>
        {friends.map(friend => (
          <li key={friend.email}>
            {friend.email}
            <button onClick={() => handleDelete(friend.email)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewFriends;

const handleDelete = async (email) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/friends/${email}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFriends(friends.filter(friend => friend.email !== email));
      alert('Amigo eliminado con éxito');
    } catch (error) {
      console.error(error);
      alert('Error al eliminar amigo');
    }
  };
  
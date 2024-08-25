import React from 'react';
import './GiftList.css';

function GiftList() {
  const gifts = [
    { name: 'Libro de programación', recipient: 'John Doe' },
    { name: 'Auriculares', recipient: 'Jane Doe' }
  ];

  return (
    <div className="gift-list">
      <h2>Lista de Regalos</h2>
      <ul>
        {gifts.map((gift, index) => (
          <li key={index}>
            <strong>{gift.name}</strong> para {gift.recipient}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GiftList;
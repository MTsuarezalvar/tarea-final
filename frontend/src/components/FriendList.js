import React from 'react';
import './FriendList.css';

function FriendList() {
  const friends = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' }
  ];

  return (
    <div className="friend-list">
      <h2>Lista de Amigos</h2>
      <ul>
        {friends.map((friend, index) => (
          <li key={index}>
            <strong>{friend.name}</strong> - {friend.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FriendList;

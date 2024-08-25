import React from 'react';

function Logout() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Has cerrado sesión');
  };

  return (
    <button onClick={handleLogout}>Cerrar Sesión</button>
  );
}

export default Logout;

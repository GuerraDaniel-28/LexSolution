import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Perfil = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();  // Hook para redireccionar

  useEffect(() => {
    // Recupera los datos del usuario desde el localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      const user = JSON.parse(atob(token.split('.')[1])); // Decodifica el token JWT para obtener los datos del usuario
      setUserData(user);
    }
  }, []);

  const handleEditProfile = () => {
    navigate('/editarp');  
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Información del Usuario</h5>
          <hr />
          <p className="card-text"><strong>Nombre de Usuario:</strong> {userData.NombreUsuario}</p>
          <p className="card-text"><strong>Numero de contacto:</strong> {userData.Contacto}</p>
          <p className="card-text"><strong>Email:</strong> {userData.Correo}</p>
         
          <hr />
          //<button className="btn btn-secondary" onClick={handleEditProfile}>Editar Perfil</button>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Perfil = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del token
        setUserData({
          NombreUsuario: decodedToken.NombreUsuario,
          Contacto: decodedToken.Contacto,
          Correo: decodedToken.Correo,
        });

        // Almacenar el ID del usuario si aún no está en localStorage
        if (!localStorage.getItem('id')) {
          localStorage.setItem('id', decodedToken.id);
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    } else {
      console.error('Token no encontrado en localStorage');
    }
  }, []);

  const handleEditProfile = () => {
    navigate('/editarp'); // Redirigir a la página de edición de perfil
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Información del Usuario</h5>
          <hr />
          <p className="card-text"><strong>Nombre de Usuario:</strong> {userData.NombreUsuario || 'No disponible'}</p>
          <p className="card-text"><strong>Número de contacto:</strong> {userData.Contacto || 'No disponible'}</p>
          <p className="card-text"><strong>Email:</strong> {userData.Correo || 'No disponible'}</p>
          <hr />
          <button className="btn btn-secondary" onClick={handleEditProfile}>Editar Perfil</button>
        </div>
      </div>
    </div>
  );
};

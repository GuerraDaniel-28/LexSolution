import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const EditarPerfil = () => {
  const [formData, setFormData] = useState({ NombreUsuario: '', Correo: '', Contacto: '', Contrasena: '' });
  const token = localStorage.getItem('authToken');
  const userId = localStorage.getItem('id'); // El ID del usuario debería estar ahora correctamente almacenado.

  useEffect(() => {
    if (token && userId) {
      fetch(`http://localhost:3000/users/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => {
          if (!response.ok) throw new Error('Error al cargar el perfil');
          return response.json();
        })
        .then(data => setFormData(data))
        .catch(error => console.error('Error al cargar el perfil:', error));
    } else {
      console.error('Token o ID de usuario no encontrados');
    }
  }, [token, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (token && userId) {
      fetch(`http://localhost:3000/edit-profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
        .then(response => {
          if (!response.ok) throw new Error('Error al actualizar el perfil');
          return response.json();
        })
        .then(data => {
          alert(data.message || 'Perfil actualizado exitosamente');
        })
        .catch(error => console.error('Error al actualizar el perfil:', error));
    } else {
      alert('Error: Token o ID de usuario no encontrados');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="nombreUsuario" className="form-label">Nombre de Usuario</label>
          <input
            type="text"
            name="NombreUsuario"
            id="nombreUsuario"
            className="form-control"
            value={formData.NombreUsuario}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo</label>
          <input
            type="email"
            name="Correo"
            id="correo"
            className="form-control"
            value={formData.Correo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contacto" className="form-label">Contacto</label>
          <input
            type="text"
            name="Contacto"
            id="contacto"
            className="form-control"
            value={formData.Contacto}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contrasena" className="form-label">Contraseña</label>
          <input
            type="password"
            name="Contrasena"
            id="contrasena"
            className="form-control"
            value={formData.Contrasena}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Actualizar Perfil</button>
      </form>
    </div>
  );
};

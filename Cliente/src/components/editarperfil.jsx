import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const EditarPerfil = () => {
    const [formData, setFormData] = useState({ Nombre_Usuario: '', Correo: '', Contacto: '', Contrasena: '' });
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('id'); // Supone que el ID del usuario está almacenado en localStorage

if (token) {
    const payload = token.split('.')[1]; // Toma la segunda parte (payload) del token
    const decoded = JSON.parse(atob(payload)); // Decodifica la parte Base64Url a un objeto
    console.log(decoded); // Muestra el contenido del payload
} else {
    console.log("Token no encontrado");
}

    useEffect(() => {
        // Obtener los datos del perfil actual al cargar el componente
        fetch(`http://localhost:3000/users/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => setFormData(data))
        .catch(error => console.error('Error al cargar el perfil:', error));
    }, [token, userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/edit-profile/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) alert(data.message);
        })
        .catch(error => console.error('Error al actualizar el perfil:', error));
    };

    return (
        <div className="container mt-5">
            <h2>Editar Perfil</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="nombreUsuario" className="form-label">Nombre de Usuario</label>
                    <input
                        type="text"
                        name="Nombre_Usuario"
                        id="nombreUsuario"
                        className="form-control"
                        value={formData.Nombre_Usuario}
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

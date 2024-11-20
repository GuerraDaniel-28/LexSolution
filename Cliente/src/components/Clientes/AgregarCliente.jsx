import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export const AgregarCliente = () => {
    const [formData, setFormData] = useState({ Nombre_Cliente: '', Direccion: '', Informacion_Contacto: '' });
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/clientes', {
            method: 'POST',
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
        .catch(error => console.error('Error al añadir cliente:', error));
    };

    const handleBack = () => {
        navigate('/clientes');
    };

    return (
        <div className="container mt-5">
            <h2>Añadir Cliente</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="nombreCliente" className="form-label">Nombre del Cliente</label>
                    <input
                        type="text"
                        name="Nombre_Cliente"
                        id="nombreCliente"
                        className="form-control"
                        placeholder="Nombre del Cliente"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Dirección</label>
                    <input
                        type="text"
                        name="Direccion"
                        id="direccion"
                        className="form-control"
                        placeholder="Dirección"
                        onChange={handleChange}
                        required
                    />
                </div>
            
                <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">Telefono</label>
                    <input
                        type="text"
                        name="Telefono"
                        id="telefono"
                        className="form-control"
                        placeholder="Telefono"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electronico</label>
                    <input
                        type="text"
                        name="Email"
                        id="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="notas" className="form-label">Notas</label>
                    <input
                        type="text"
                        name="Notas"
                        id="notas"
                        className="form-control"
                        placeholder="Notas"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Añadir</button>
                <button onClick={handleBack} className="btn btn-secondary">Atrás</button>
            </form>
        </div>
    );
};

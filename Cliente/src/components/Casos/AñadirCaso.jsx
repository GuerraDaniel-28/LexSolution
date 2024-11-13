import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export const AñadirCaso = () => {
    const [clientes, setClientes] = useState([]);
    const [formData, setFormData] = useState({
        Estado: 'activo',
        Fecha_Creacion: '',
        Resumen_Caso: '',
        Cliente_ID: ''
    });
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        fetch('http://localhost:3000/clientes', {
            headers: { 'Authorization': `Bearer ${token}` },
        })
        .then(response => response.json())
        .then(data => setClientes(data))
        .catch(error => console.error('Error al cargar los clientes:', error));
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/casos', {
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
        .catch(error => console.error('Error al añadir caso:', error));
    };

    const handleBack = () => {
        navigate('/casos');
    };

    return (
        <div className="container mt-5">
            <h2>Añadir Caso</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="cliente" className="form-label">Seleccionar Cliente</label>
                    <select
                        name="Cliente_ID"
                        className="form-select"
                        onChange={handleChange}
                        required
                        id="cliente"
                    >
                        <option value="">Seleccionar cliente</option>
                        {clientes.map(cliente => (
                            <option key={cliente.ID_Cliente} value={cliente.ID_Cliente}>
                                {cliente.Nombre_Cliente}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="estado" className="form-label">Estado</label>
                    <select
                        name="Estado"
                        className="form-select"
                        onChange={handleChange}
                        id="estado"
                    >
                        <option value="activo">Activo</option>
                        <option value="completo">Completo</option>
                        <option value="incompleto">Incompleto</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="fechaCreacion" className="form-label">Fecha de Creación</label>
                    <input
                        type="date"
                        name="Fecha_Creacion"
                        className="form-control"
                        onChange={handleChange}
                        required
                        id="fechaCreacion"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="resumenCaso" className="form-label">Resumen del Caso</label>
                    <input
                        type="text"
                        name="Resumen_Caso"
                        className="form-control"
                        placeholder="Resumen del caso"
                        onChange={handleChange}
                        required
                        id="resumenCaso"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Añadir Caso</button>
                <button onClick={handleBack} className="btn btn-secondary">Atrás</button>
            </form>
        </div>
    );
};

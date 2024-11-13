import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ListaCasos = () => {
    const [casos, setCasos] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        fetch('http://localhost:3000/casos', {
            headers: { 'Authorization': `Bearer ${token}` },
        })
        .then(response => response.json())
        .then(data => setCasos(data))
        .catch(error => console.error('Error al cargar los casos:', error));
    }, [token]);

    const handleAddCaso = () => {
        navigate('/casos/nuevo');
    };

    const handleViewClientes = () => {
        navigate('/clientes');
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Lista de Casos</h2>
            <div className="d-flex justify-content-end mb-3">
                <button onClick={handleAddCaso} className="btn btn-primary me-2">Añadir Caso</button>
                <button onClick={handleViewClientes} className="btn btn-secondary">Ver Todos los Clientes</button>
            </div>
            <div className="list-group">
                {casos.map(caso => (
                    <a key={caso.ID_Caso} href={`/casos/${caso.ID_Caso}`} className="list-group-item list-group-item-action">
                        <strong>Cliente:</strong> {caso.Nombre_Cliente} <br />
                        <strong>Estado:</strong> {caso.Estado}
                    </a>
                ))}
            </div>
        </div>
    );
};

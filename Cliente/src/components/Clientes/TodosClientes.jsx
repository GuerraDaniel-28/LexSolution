import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export const TodosClientes = () => {
    const [clientes, setClientes] = useState([]);
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

    const handleAddCliente = () => {
        navigate('/agclientes');
    };

    const handleViewCasos = () => {
        navigate('/casos');
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Lista de Clientes</h2>
            <div className="d-flex justify-content-end mb-3">
                <button onClick={handleAddCliente} className="btn btn-primary me-2">Añadir Cliente</button>
                <button onClick={handleViewCasos} className="btn btn-secondary">Ver Lista de Casos</button>
            </div>
            <div className="list-group">
                {clientes.map(cliente => (
                    <a key={cliente.ID_Cliente} href={`/clientes/${cliente.ID_Cliente}`} className="list-group-item list-group-item-action">
                        <strong>Cliente:</strong> {cliente.Nombre_Cliente}
                    </a>
                ))}
            </div>
        </div>
    );
};

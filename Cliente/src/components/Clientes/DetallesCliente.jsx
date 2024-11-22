import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export const DetallesCliente = () => {
    const { id } = useParams();
    const [cliente, setCliente] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        fetch(`http://localhost:3000/clientes/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
        .then(response => response.json())
        .then(data => setCliente(data))
        .catch(error => console.error('Error al cargar los detalles del cliente:', error));
    }, [id, token]);

    const handleBack = () => {
        navigate('/clientes');
    };

    return (
        <div className="container mt-5">
            <button onClick={handleBack} className="btn btn-primary mb-4">Regresar</button>
            {cliente ? (
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">{cliente.Nombre_Cliente}</h2>
                        <hr />
                        <p className="card-text"><strong>Dirección:</strong> {cliente.Direccion}</p>
                        <p className="card-text"><strong>Telefono:</strong> {cliente.Telefono}</p>
                        <p className="card-text"><strong>Correo Electronico:</strong> {cliente.Email}</p>
                        <p className="card-text"><strong>Notas:</strong> {cliente.Notas}</p>

                    </div>
                </div>
            ) : (
                <div className="alert alert-info" role="alert">
                    Cargando detalles del cliente...
                </div>
            )}
        </div>
    );
};

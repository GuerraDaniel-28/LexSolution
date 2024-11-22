import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SubirDoc } from '../Documentos/SubirDoc';
import { VerDoc } from '../Documentos/VerDoc';

export const DetallesCaso = ({casoId }) => {
    const { id } = useParams();
    const [caso, setCaso] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        fetch(`http://localhost:3000/casos/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
        .then(response => response.json())
        .then(data => setCaso(data))
        .catch(error => console.error('Error al cargar los detalles del caso:', error));
    }, [id, token]);
    const handleBack = () => {
        navigate('/casos');
    };
    const documentos = () => {
        navigate('/documentos');
    };
    return (
        <div className="container mt-5">
         <button onClick={handleBack} className="btn btn-primary mb-4">Regresar</button>
         <button onClick={documentos} className="btn btn-primary mb-4">Documentos asociados</button>

            {caso ? (
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">Detalle del Caso</h2>
                        <hr />
                        <p className="card-text"><strong>Cliente:</strong> {caso.Nombre_Cliente}</p>

                        <p className="card-text"><strong>Nombre del caso:</strong> {caso.Nombre}</p>
                        <p className="card-text"><strong>Folio:</strong> {caso.Folio}</p>
                        <p className="card-text"><strong>Tipo de Caso:</strong> {caso.Tipo_Caso}</p>
                        <p className="card-text"><strong>Estado:</strong> {caso.Estado}</p>
                        <p className="card-text"><strong>Fecha de Creación:</strong> {new Date(caso.Fecha_Creacion).toLocaleDateString()}</p>
                        <p className="card-text"><strong>Resumen del Caso:</strong> {caso.Resumen_Caso}</p>
                        <SubirDoc folioCaso={id} />
                        <VerDoc folioCaso={id} />

                    </div>
                </div>
            ) : (
                <div className="alert alert-info" role="alert">
                    Cargando detalles del caso...
                </div>
            )}
        </div>
    );
};

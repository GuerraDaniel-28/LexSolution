import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const VerDoc = ({ casoId }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/documentos/caso/${casoId}`);
        console.log('Documentos obtenidos:', response.data);

        if (Array.isArray(response.data)) {
          setDocuments(response.data);
        } else {
          throw new Error('Respuesta inesperada del servidor.');
        }
      } catch (err) {
        console.error('Error al obtener documentos:', err);
        setError('No se pudieron cargar los documentos.');
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [casoId]);

  if (loading) return <p>Cargando documentos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Documentos del Caso {casoId}</h3>
      {documents.length > 0 ? (
        <ul>
          {documents.map((doc) => (
            <li key={doc.ID_Documento}>
              <p><strong>Folio:</strong> {doc.Folio_Documento}</p>
              <p><strong>Tipo:</strong> {doc.Tipo_Documento}</p>
              <p><strong>Estado:</strong> {doc.Estado_Documento}</p>
              <p><strong>Fecha:</strong> {new Date(doc.Fecha_Creacion).toLocaleDateString()}</p>
              <a
                href={`/api/documentos/${doc.ID_Documento}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Descargar Documento
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay documentos disponibles para este caso.</p>
      )}
    </div>
  );
};

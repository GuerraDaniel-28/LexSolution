import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const DocumentosAsociados = () => {
  const { id } = useParams(); // id del caso
  const navigate = useNavigate();
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/casos/${id}/documentos`)
      .then((response) => response.json())
      .then((data) => setDocumentos(data))
      .catch((error) =>
        console.error("Error al cargar los documentos asociados:", error)
      );
  }, [id]);

  const handleAddDocument = () => {
    navigate(`/casos/${id}/documentos/subir`);
  };

  const handleDocumentClick = (documentoId) => {
    navigate(`/casos/${id}/documentos/${documentoId}`);
  };

  const handleBackToCase = () => {
    navigate(`/casos/${id}`);
  };

  return (
    <div>
      {/* Header */}
      <header
        style={{
            backgroundColor: "#002855",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            padding: "20px",
            height: "120px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "36px" }}>Documentos Asociados</h1>
        <div style={{ display: "flex", gap: "20px" }}>
            <button
              onClick={handleAddDocument}
              style={{
                padding: "10px 20px",
                backgroundColor: "#d4af37",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Añadir Documento
            </button>
        <button
          onClick={handleBackToCase}
          style={{
            padding: "10px 20px",
            backgroundColor: "white",
            color: "black",
            border: "1px solid #ccc",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Volver al Caso
        </button>
        </div>
      </header>

      {/* Content */}
      <main
        style={{
          padding: "20px",
          backgroundColor: "white",
          minHeight: "calc(100vh - 120px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "80%",
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            textAlign: "left",
          }}
        >
          
          {documentos.length > 0 ? (
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {documentos.map((doc) => (
                <li
                  key={doc.Folio_Documento}
                  style={{
                    backgroundColor: "#f1f1f1",
                    marginBottom: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDocumentClick(doc.Folio_Documento)}
                >
                  <strong>{doc.Nombre_Archivo}</strong> - {doc.Tipo_Documento}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay documentos asociados a este caso.</p>
          )}
        </div>
      </main>
    </div>
  );
};


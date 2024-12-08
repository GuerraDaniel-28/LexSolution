import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const DetallesCaso = () => {
  const { id } = useParams();
  const [caso, setCaso] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetch(`http://localhost:3000/casos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setCaso(data))
      .catch((error) =>
        console.error("Error al cargar los detalles del caso:", error)
      );
  }, [id, token]);

  const handleBack = () => {
    navigate("/casos");
  };

  const handleEdit = () => {
    navigate(`/casos/${id}/editar`);
  };
  

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este caso?")) {
      fetch(`http://localhost:3000/casos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.ok) {
            alert("Caso eliminado exitosamente.");
            navigate("/casos");
          } else {
            response.json().then((data) => {
              alert(data.error || "Error al eliminar el caso.");
            });
          }
        })
        .catch((error) =>
          console.error("Error al eliminar el caso:", error)
        );
    }
  };

  const documentos = () => {
    navigate(`/casos/${id}/documentos`);
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
        <h1 style={{ margin: 0, fontSize: "36px" }}>Detalles del Caso</h1>
        <div style={{ display: "flex", gap: "20px" }}>
          
          <button
            onClick={documentos}
            style={{
              padding: "15px 30px",
              backgroundColor: "#d4af37",
              color: "black",
              border: "1px solid #ccc",
              borderRadius: "20px",
              fontSize: "18px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Documentos Asociados
          </button><button
            onClick={handleBack}
            style={{
              padding: "15px 30px",
              backgroundColor: "white",
              color: "black",
              border: "none",
              borderRadius: "20px",
              fontSize: "18px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Volver
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
        {caso ? (
          <div
            style={{
              width: "80%",
              backgroundColor: "#f9f9f9",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              textAlign: "left",
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>Detalle del Caso</h2>
            <hr />
            <p>
              <strong>Cliente:</strong> {caso.Nombre_Cliente}
            </p>
            <p>
              <strong>Nombre del caso:</strong> {caso.Nombre}
            </p>
            <p>
              <strong>Folio:</strong> {caso.Folio}
            </p>
            <p>
              <strong>Tipo de Caso:</strong> {caso.Tipo_Caso}
            </p>
            <p>
              <strong>Estado:</strong> {caso.Estado}
            </p>
            <p>
              <strong>Fecha de Creación:</strong>{" "}
              {new Date(caso.Fecha_Creacion).toLocaleDateString()}
            </p>
            <p>
              <strong>Resumen del Caso:</strong> {caso.Resumen_Caso}
            </p>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <button
                onClick={handleEdit}
                style={{
                  marginRight: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Editar Caso
              </button>
              <button
                onClick={handleDelete}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Borrar Caso
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              color: "#999",
              fontSize: "20px",
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              width: "60%",
              textAlign: "center",
            }}
          >
            Cargando detalles del caso...
          </div>
        )}
      </main>
    </div>
  );
};

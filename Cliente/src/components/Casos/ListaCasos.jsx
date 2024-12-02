import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ListaCasos = () => {
  const [casos, setCasos] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetch("http://localhost:3000/casos", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setCasos(data))
      .catch((error) => console.error("Error al cargar los casos:", error));
  }, [token]);

  const handleAddCaso = () => {
    navigate("/casos/nuevo");
  };

  const handleregresar = () => {
    navigate("/dashboard");
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
        <h1 style={{ margin: 0, fontSize: "36px" }}>Lista de Casos</h1>
        <div style={{ display: "flex", gap: "20px" }}>
          <button
            onClick={handleAddCaso}
            style={{
              padding: "15px 30px",
              backgroundColor: "#d4af37",
              color: "black",
              border: "none",
              borderRadius: "20px",
              fontSize: "18px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Añadir Caso
          </button>
          <button
            onClick={handleregresar}
            style={{
              padding: "15px 30px",
              backgroundColor: "white",
              color: "black",
              border: "1px solid #ccc",
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
        {casos.length === 0 ? (
          <>
            <img
              src="/imagenes/nose.jpg"
              alt="Portafolio"
              style={{
                width: "150px",
                height: "150px",
                marginBottom: "20px",
              }}
            />
            <p style={{ color: "#999", fontSize: "28px" }}>
              No tienes ningún caso registrado
            </p>
          </>
        ) : (
          <div style={{ width: "100%" }}>
            {casos.map((caso) => (
              <a
                key={caso.ID_Caso}
                href={`/casos/${caso.ID_Caso}`}
                style={{
                  display: "block",
                  backgroundColor: "#f9f9f9",
                  color: "black",
                  padding: "15px",
                  margin: "10px auto",
                  textDecoration: "none",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  width: "80%",
                  textAlign: "left",
                }}
              >
                
                <strong></strong> {caso.Nombre} <br />
                <strong>Folio:</strong> {caso.Folio} <br />
                <strong>Cliente:</strong> {caso.Nombre_Cliente} <br />
                <strong>Estado:</strong> {caso.Estado}
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};


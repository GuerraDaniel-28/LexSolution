import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const DetallesCliente = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetch(`http://localhost:3000/clientes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setCliente(data))
      .catch((error) =>
        console.error("Error al cargar los detalles del cliente:", error)
      );
  }, [id, token]);

  const handleBack = () => {
    navigate("/clientes");
  };

  const handleUpdate = () => {
    navigate(`/clientes/${id}/editar`);
  };

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      fetch(`http://localhost:3000/clientes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.ok) {
            alert("Cliente eliminado exitosamente.");
            navigate("/clientes");
          } else {
            response.json().then((data) => {
              alert(data.error || "Error al eliminar el cliente.");
            });
          }
        })
        .catch((error) =>
          console.error("Error al eliminar el cliente:", error)
        );
    }
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
        <h1 style={{ margin: 0, fontSize: "36px" }}>Detalles del Cliente</h1>
        <button
          onClick={handleBack}
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
          Regresar
        </button>
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
        {cliente ? (
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
            <h2 style={{ marginBottom: "20px" }}>{cliente.Nombre_Cliente}</h2>
            <hr />
            <p>
              <strong>Dirección:</strong> {cliente.Direccion}
            </p>
            <p>
              <strong>Teléfono:</strong> {cliente.Telefono}
            </p>
            <p>
              <strong>Correo Electrónico:</strong> {cliente.Email}
            </p>
            <p>
              <strong>Notas:</strong> {cliente.Notas}
            </p>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <button
                onClick={handleUpdate}
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
                Actualizar Cliente
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
                Eliminar Cliente
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
            Cargando detalles del cliente...
          </div>
        )}
      </main>
    </div>
  );
};

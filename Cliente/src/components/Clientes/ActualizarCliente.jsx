import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const ActualizarCliente = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState({
    Nombre_Cliente: "",
    Direccion: "",
    Telefono: "",
    Email: "",
    Notas: "",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    // Obtener datos del cliente
    fetch(`http://localhost:3000/clientes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setCliente(data))
      .catch((error) =>
        console.error("Error al cargar los detalles del cliente:", error)
      );
  }, [id, token]);

  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enviar datos actualizados al backend
    fetch(`http://localhost:3000/clientes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cliente),
    })
      .then((response) => {
        if (response.ok) {
          alert("Cliente actualizado exitosamente.");
          navigate(`/clientes/${id}`);
        } else {
          response.json().then((data) => {
            alert(data.error || "Error al actualizar el cliente.");
          });
        }
      })
      .catch((error) => console.error("Error al actualizar el cliente:", error));
  };

  const handleBack = () => {
    navigate(`/clientes/${id}`);
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
        <h1 style={{ margin: 0, fontSize: "36px" }}>Actualizar Cliente</h1>
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
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "80%",
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Editar Cliente</h2>
          <div style={{ marginBottom: "20px" }}>
            <label>
              <strong>Nombre del Cliente:</strong>
            </label>
            <input
              type="text"
              name="Nombre_Cliente"
              value={cliente.Nombre_Cliente}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label>
              <strong>Dirección:</strong>
            </label>
            <input
              type="text"
              name="Direccion"
              value={cliente.Direccion}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label>
              <strong>Teléfono:</strong>
            </label>
            <input
              type="text"
              name="Telefono"
              value={cliente.Telefono}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label>
              <strong>Correo Electrónico:</strong>
            </label>
            <input
              type="email"
              name="Email"
              value={cliente.Email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label>
              <strong>Notas:</strong>
            </label>
            <textarea
              name="Notas"
              value={cliente.Notas}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            ></textarea>
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

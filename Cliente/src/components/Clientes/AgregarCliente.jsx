import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AgregarCliente = () => {
  const [formData, setFormData] = useState({
    Nombre_Cliente: "",
    Direccion: "",
    Telefono: "",
    Email: "",
    Notas: "",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) alert(data.message);
      })
      .catch((error) => console.error("Error al añadir cliente:", error));
  };

  const handleBack = () => {
    navigate("/clientes");
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
        <h1 style={{ margin: 0, fontSize: "36px" }}>Añadir Cliente</h1>
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
          Atrás
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
        <form
          onSubmit={handleSubmit}
          style={{
            width: "80%",
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="nombreCliente" style={{ fontWeight: "bold" }}>
              Nombre del Cliente
            </label>
            <input
              type="text"
              name="Nombre_Cliente"
              id="nombreCliente"
              className="form-control"
              placeholder="Nombre del Cliente"
              onChange={handleChange}
              required
              style={{ marginTop: "10px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="direccion" style={{ fontWeight: "bold" }}>
              Dirección
            </label>
            <input
              type="text"
              name="Direccion"
              id="direccion"
              className="form-control"
              placeholder="Dirección"
              onChange={handleChange}
              required
              style={{ marginTop: "10px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="telefono" style={{ fontWeight: "bold" }}>
              Teléfono
            </label>
            <input
              type="text"
              name="Telefono"
              id="telefono"
              className="form-control"
              placeholder="Teléfono"
              onChange={handleChange}
              required
              style={{ marginTop: "10px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="email" style={{ fontWeight: "bold" }}>
              Correo Electrónico
            </label>
            <input
              type="email"
              name="Email"
              id="email"
              className="form-control"
              placeholder="Correo Electrónico"
              onChange={handleChange}
              required
              style={{ marginTop: "10px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="notas" style={{ fontWeight: "bold" }}>
              Notas
            </label>
            <textarea
              name="Notas"
              id="notas"
              className="form-control"
              placeholder="Notas"
              rows="3"
              onChange={handleChange}
              required
              style={{ marginTop: "10px" }}
            ></textarea>
          </div>

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#d4af37",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold",
              marginRight: "10px",
            }}
          >
            Añadir Cliente
          </button>
        </form>
      </main>
    </div>
  );
};


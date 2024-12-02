import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AñadirCaso = () => {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    Estado: "activo",
    Fecha_Creacion: "",
    Resumen_Caso: "",
    Cliente_ID: "",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetch("http://localhost:3000/clientes", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error("Error al cargar los clientes:", error));
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/casos", {
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
      .catch((error) => console.error("Error al añadir caso:", error));
  };

  const handleBack = () => {
    navigate("/casos");
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
        <h1 style={{ margin: 0, fontSize: "36px" }}>Añadir Caso</h1>
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
            <label htmlFor="cliente" style={{ fontWeight: "bold" }}>
              Seleccionar Cliente
            </label>
            <select
              name="Cliente_ID"
              className="form-select"
              onChange={handleChange}
              required
              id="cliente"
              style={{ marginTop: "10px" }}
            >
              <option value="">Seleccionar cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.ID_Cliente} value={cliente.ID_Cliente}>
                  {cliente.Nombre_Cliente}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="nombre" style={{ fontWeight: "bold" }}>
              Nombre del Caso
            </label>
            <input
              type="text"
              name="Nombre"
              className="form-control"
              placeholder="Añade un nombre del caso"
              onChange={handleChange}
              required
              id="nombre"
              style={{ marginTop: "10px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="folio" style={{ fontWeight: "bold" }}>
              Folio
            </label>
            <input
              type="text"
              name="Folio"
              className="form-control"
              placeholder="Añade un folio"
              onChange={handleChange}
              required
              id="folio"
              style={{ marginTop: "10px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="tipo" style={{ fontWeight: "bold" }}>
              Tipo de Caso
            </label>
            <select
              name="Tipo_Caso"
              className="form-select"
              onChange={handleChange}
              id="tipo"
              style={{ marginTop: "10px" }}
            >
              <option value="familiar">Familiar</option>
              <option value="empresarial">Empresarial</option>
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="estado" style={{ fontWeight: "bold" }}>
              Estado
            </label>
            <select
              name="Estado"
              className="form-select"
              onChange={handleChange}
              id="estado"
              style={{ marginTop: "10px" }}
            >
              <option value="activo">Activo</option>
              <option value="completo">Completo</option>
              <option value="incompleto">Incompleto</option>
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="fechaCreacion" style={{ fontWeight: "bold" }}>
              Fecha de Creación
            </label>
            <input
              type="date"
              name="Fecha_Creacion"
              className="form-control"
              onChange={handleChange}
              required
              id="fechaCreacion"
              style={{ marginTop: "10px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="resumenCaso" style={{ fontWeight: "bold" }}>
              Resumen del Caso
            </label>
            <textarea
              name="Resumen_Caso"
              className="form-control"
              placeholder="Resumen del caso"
              onChange={handleChange}
              required
              id="resumenCaso"
              rows="3"
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
            Añadir Caso
          </button>
        </form>
      </main>
    </div>
  );
};


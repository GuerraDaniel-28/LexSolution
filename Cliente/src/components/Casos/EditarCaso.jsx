import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const EditarCaso = () => {
  const { id } = useParams();
  const [caso, setCaso] = useState({
    Nombre: "",
    Folio: "",
    Tipo_Caso: "",
    Estado: "",
    Fecha_Creacion: "",
    Resumen_Caso: "",
    Cliente_ID: "",
  });
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    // Cargar los detalles del caso
    fetch(`http://localhost:3000/casos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setCaso(data))
      .catch((error) =>
        console.error("Error al cargar los detalles del caso:", error)
      );

    // Cargar lista de clientes
    fetch(`http://localhost:3000/clientes`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) =>
        console.error("Error al cargar la lista de clientes:", error)
      );
  }, [id, token]);

  const handleChange = (e) => {
    setCaso({
      ...caso,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/casos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(caso),
    })
      .then((response) => {
        if (response.ok) {
          alert("Caso actualizado exitosamente.");
          navigate(`/casos/${id}`);
        } else {
          response.json().then((data) => {
            alert(data.error || "Error al actualizar el caso.");
          });
        }
      })
      .catch((error) =>
        console.error("Error al actualizar el caso:", error)
      );
  };

  const handleBack = () => {
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
        <h1 style={{ margin: 0, fontSize: "36px" }}>Editar Caso</h1>
        <button
          onClick={handleBack}
          style={{
            padding: "15px 30px",
            backgroundColor: "#d4af37",
            color: "white",
            border: "none",
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
          <h2 style={{ textAlign: "center" }}>Editar Caso</h2>
          <div style={{ marginBottom: "20px" }}>
            <label>
              <strong>Cliente Asociado:</strong>
            </label>
            <select
              name="Cliente_ID"
              value={caso.Cliente_ID}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              required
            >
              <option value="">Seleccionar Cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.ID_Cliente} value={cliente.ID_Cliente}>
                  {cliente.Nombre_Cliente}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label>
              <strong>Nombre del Caso:</strong>
            </label>
            <input
              type="text"
              name="Nombre"
              value={caso.Nombre}
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
              <strong>Folio:</strong>
            </label>
            <input
              type="text"
              name="Folio"
              value={caso.Folio}
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
              <strong>Tipo de Caso:</strong>
            </label>
            <input
              type="text"
              name="Tipo_Caso"
              value={caso.Tipo_Caso}
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
              <strong>Estado:</strong>
            </label>
            <input
              type="text"
              name="Estado"
              value={caso.Estado}
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
              <strong>Fecha de Creación:</strong>
            </label>
            <input
              type="date"
              name="Fecha_Creacion"
              value={caso.Fecha_Creacion}
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
              <strong>Resumen del Caso:</strong>
            </label>
            <textarea
              name="Resumen_Caso"
              value={caso.Resumen_Caso}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              required
            ></textarea>
          </div>
          
          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#d4af37",
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

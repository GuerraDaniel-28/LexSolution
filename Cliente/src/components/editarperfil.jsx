import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const EditarPerfil = () => {
  const [formData, setFormData] = useState({
    NombreUsuario: "",
    Correo: "",
    Contacto: "",
    Contrasena: "",
  });
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    if (token && userId) {
      fetch(`http://localhost:3000/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (!response.ok) throw new Error("Error al cargar el perfil");
          return response.json();
        })
        .then((data) => setFormData(data))
        .catch((error) => console.error("Error al cargar el perfil:", error));
    } else {
      console.error("Token o ID de usuario no encontrados");
    }
  }, [token, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (token && userId) {
      fetch(`http://localhost:3000/edit-profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Error al actualizar el perfil");
          return response.json();
        })
        .then((data) => {
          alert(data.message || "Perfil actualizado exitosamente");
        })
        .catch((error) =>
          console.error("Error al actualizar el perfil:", error)
        );
    } else {
      alert("Error: Token o ID de usuario no encontrados");
    }
  };

  const handleBackToProfile = () => {
    navigate("/perfil");
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
          alignItems: "center",
          padding: "20px",
          height: "120px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "36px" }}>Editar Perfil</h1>
        <button
          onClick={handleBackToProfile}
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
          Volver a Perfil
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
            <label htmlFor="nombreUsuario" style={{ fontWeight: "bold" }}>
              Nombre de Usuario
            </label>
            <input
              type="text"
              name="NombreUsuario"
              id="nombreUsuario"
              className="form-control"
              value={formData.NombreUsuario}
              onChange={handleChange}
              required
              style={{ marginTop: "10px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="correo" style={{ fontWeight: "bold" }}>
              Correo
            </label>
            <input
              type="email"
              name="Correo"
              id="correo"
              className="form-control"
              value={formData.Correo}
              onChange={handleChange}
              required
              style={{ marginTop: "10px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="contacto" style={{ fontWeight: "bold" }}>
              Contacto
            </label>
            <input
              type="text"
              name="Contacto"
              id="contacto"
              className="form-control"
              value={formData.Contacto}
              onChange={handleChange}
              required
              style={{ marginTop: "10px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="contrasena" style={{ fontWeight: "bold" }}>
              Contraseña
            </label>
            <input
              type="password"
              name="Contrasena"
              id="contrasena"
              className="form-control"
              value={formData.Contrasena}
              onChange={handleChange}
              required
              style={{ marginTop: "10px" }}
            />
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
            Actualizar Perfil
          </button>
        </form>
      </main>
    </div>
  );
};


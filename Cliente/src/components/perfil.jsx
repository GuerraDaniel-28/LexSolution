import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Perfil = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodifica el payload del token
        setUserData({
          NombreUsuario: decodedToken.NombreUsuario,
          Contacto: decodedToken.Contacto,
          Correo: decodedToken.Correo,
        });

        // Almacenar el ID del usuario si aún no está en localStorage
        if (!localStorage.getItem("id")) {
          localStorage.setItem("id", decodedToken.id);
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    } else {
      console.error("Token no encontrado en localStorage");
    }
  }, []);

  const handleEditProfile = () => {
    navigate("/editarp"); // Redirigir a la página de edición de perfil
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard"); // Redirigir al dashboard
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
        <h1 style={{ margin: 0, fontSize: "36px" }}>Perfil de Usuario</h1>
        <button
          onClick={handleBackToDashboard}
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
          Volver
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
          <h5 style={{ marginBottom: "20px" }}>Información del Usuario</h5>
          <hr />
          <p>
            <strong>Nombre de Usuario:</strong>{" "}
            {userData.NombreUsuario || "No disponible"}
          </p>
          <p>
            <strong>Número de contacto:</strong>{" "}
            {userData.Contacto || "No disponible"}
          </p>
          <p>
            <strong>Email:</strong> {userData.Correo || "No disponible"}
          </p>
          <hr />
          <button
            onClick={handleEditProfile}
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
            Editar Perfil
          </button>
        </div>
      </main>
    </div>
  );
};


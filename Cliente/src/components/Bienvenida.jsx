import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export const Bienvenida = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Elimina el token del almacenamiento local
    localStorage.removeItem("authToken");

    // Redirige a la página de inicio o de login
    navigate("/");
  };





  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        height: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundImage: "url('/imagenes/Imagen2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {/* Encabezado */}
      <div
        style={{
          position: "absolute",
          top: "180px",
          right: "120px",
          color: "white",
          textAlign: "right",
        }}
      >
        
      </div>

      {/* Contenedor del menú */}
      <div className="container mt-5">
        <div className="text-center mb-5">
          <h1
            className="display-4"
            style={{ fontFamily: "Merriweather, serif", color: "white" }}
          >
            Bienvenido a LexSolution
          </h1>
          <p className="lead"style={{
                color: "white",
                borderRadius: "8px",
              }} >
            Tu plataforma integral para la gestión de clientes y casos legales
          </p>
        </div>

        <div className="row">
          {/* Tarjeta de Casos */}
          <div className="col-md-4">
            <div
              className="card shadow-sm mb-4"
              style={{
                backgroundColor: "#1E3A72",
                color: "white",
                borderRadius: "8px",
              }}
            >
              <div className="card-body text-center">
                <h5 className="card-title">Casos</h5>
                <p className="card-text">
                  Gestiona y visualiza tus casos activos
                </p>
                <a
                  href="/casos"
                  className="btn"
                  style={{
                    backgroundColor: "#D4AF37",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "1em",
                    padding: "10px 20px",
                  }}
                >
                  Ver Casos
                </a>
              </div>
            </div>
          </div>

          {/* Tarjeta de Clientes */}
          <div className="col-md-4">
            <div
              className="card shadow-sm mb-4"
              style={{
                backgroundColor: "#1E3A72",
                color: "white",
                borderRadius: "8px",
              }}
            >
              <div className="card-body text-center">
                <h5 className="card-title">Clientes</h5>
                <p className="card-text">Administra los datos de tus clientes</p>
                <a
                  href="/clientes"
                  className="btn"
                  style={{
                    backgroundColor: "#D4AF37",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "1em",
                    padding: "10px 20px",
                  }}
                >
                  Ver Clientes
                </a>
              </div>
            </div>
          </div>

          {/* Tarjeta de Configuración */}
          <div className="col-md-4">
            <div
              className="card shadow-sm mb-4"
              style={{
                backgroundColor: "#1E3A72",
                color: "white",
                borderRadius: "8px",
              }}
            >
              <div className="card-body text-center">
                <h5 className="card-title">Configuración</h5>
                <p className="card-text">Configura tus datos de usuario</p>
                <a
                  href="/perfil"
                  className="btn"
                  style={{
                    backgroundColor: "#D4AF37",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "1em",
                    padding: "10px 20px",
                  }}
                >
                  Perfil
                </a>
              </div>
            </div>
          </div>

          

          <div className="col-md-4">
            <div
              className="card shadow-sm mb-4"
              style={{
                backgroundColor: "#1E3A72",
                color: "white",
                borderRadius: "8px",
              }}
            >
               <div className="card-body text-center">
      <h5 className="card-title">Cerrar Sesión</h5>
      <p className="card-text">Cierra la sesión de la aplicación</p>
      <button
        className="btn"
        onClick={handleLogout}
        style={{
          backgroundColor: "#D4AF37",
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontSize: "1em",
          padding: "10px 20px",
        }}
      >
        Cerrar Sesión
      </button>
    </div>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
};


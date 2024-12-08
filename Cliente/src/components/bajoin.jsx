import React from "react";
import { Link } from "react-router-dom";

export const Bajoin = () => {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        backgroundImage: "url('/imagenes/Imagen1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        color: "white",
        fontFamily: "'Arial', sans-serif",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
        }}
      >
        <img
          src="/imagenes/img3.png"
          alt="LexSolution Logo"
          style={{
            width: "120px",
            height: "auto",
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          marginLeft: "150px",
          textAlign: "left",
        }}
      >
        <h2
          style={{
            fontSize: "1.2rem",
            margin: 0,
            color: "#c3944a",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          LexSolution
        </h2>
        <h1
          style={{
            fontSize: "3.5rem",
            margin: "10px 0 20px 0",
            lineHeight: "1.2",
          }}
        >
          SOLUCIONANDO
          <br />
          EL FUTURO
        </h1>
        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <Link
            to="/Registro"
            style={{
              textDecoration: "none",
            }}
          >
            <button
              style={{
                padding: "10px 20px",
                fontSize: "1rem",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                backgroundColor: "#c3944a",
                color: "white",
              }}
            >
              REGÍSTRATE
            </button>
          </Link>
          <button
          
            style={{
              padding: "10px 20px",
              fontSize: "1rem",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: "white",
              color: "black",
            }}
          >
            ECOBYTE
          </button>
        </div>
      </div>

      {/* Image Container */}
      <div
        style={{
          position: "relative",
          marginRight: "150px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "15px",
            left: "-35px",
            width: "400px",
            height: "410px",
            backgroundColor: "#c3944a",
            zIndex: 1,
          }}
        ></div>
        <div
          style={{
            position: "relative",
            zIndex: 2,
          }}
        >
          <img
            src="/imagenes/img2.jpg"
            alt="Imagen decorativa"
            style={{
              width: "700px",
              height: "auto",
              border: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "-150px",
              right: 0,
              display: "flex",
              gap: "20px",
            }}
          >
            <Link
              to="/Login"
              style={{
                textDecoration: "none",
              }}
            >
              <button
                style={{
                  marginTop:"40px",
                  padding: "10px 20px",
                  fontSize: "0.9rem",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                INICIAR SESIÓN
              </button>
            </Link>
            <Link
              to="/Registro"
              style={{
                textDecoration: "none",
              }}
            >
              <button
                style={{
                  marginTop:"40px",
                  padding: "10px 20px",
                  fontSize: "0.9rem",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  backgroundColor: "#c3944a",
                  color: "white",
                }}
              >
                REGÍSTRATE
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


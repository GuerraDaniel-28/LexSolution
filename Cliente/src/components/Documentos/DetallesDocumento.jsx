import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import mammoth from "mammoth";

// Importa directamente el archivo del Worker de pdfjs-dist
const workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

export const DetallesDocumento = () => {
  const { id, documentoId } = useParams();
  const [documento, setDocumento] = useState(null);
  const [docxContent, setDocxContent] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Folio recibido:", documentoId);
    if (!documentoId) {
      setErrorMessage("Folio del documento no proporcionado.");
      return;
    }

    fetch(`http://localhost:3000/documentos/${documentoId}`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "Error al obtener el documento");
          });
        }
        return response.blob(); // Devuelve el archivo como blob
      })
      .then((blob) => {
        const fileType = blob.type;

        if (fileType === "application/pdf") {
          setDocumentType("pdf");
          setDocumento(URL.createObjectURL(blob));
        } else if (
          fileType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          setDocumentType("docx");
          convertDocxToHtml(blob);
        } else {
          throw new Error(`Tipo de documento no soportado: ${fileType}`);
        }
      })
      .catch((error) => {
        console.error("Error al cargar el documento:", error.message);
        setErrorMessage(error.message);
      });
  }, [documentoId]);

  const convertDocxToHtml = async (blob) => {
    try {
      const arrayBuffer = await blob.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      setDocxContent(result.value);
    } catch (error) {
      console.error("Error al convertir el documento DOCX:", error);
      setErrorMessage("Error al procesar el archivo DOCX.");
    }
  };

  const handleBackToDocuments = () => {
    navigate(`/casos/${id}/documentos`);
  };

  return (
    <div>
      {/* Encabezado */}
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
        <h1 style={{ margin: 0, fontSize: "36px" }}>Detalles del Documento</h1>
        <button
          onClick={handleBackToDocuments}
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
          Volver a Documentos
        </button>
      </header>

      {/* Contenido Principal */}
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
          {errorMessage ? (
            <div
              style={{
                color: "red",
                fontWeight: "bold",
                marginTop: "20px",
                textAlign: "center",
              }}
            >
              {errorMessage}
            </div>
          ) : documentType === "pdf" && documento ? (
            <Worker workerUrl={workerSrc}>
              <Viewer fileUrl={documento} />
            </Worker>
          ) : documentType === "docx" && docxContent ? (
            <div
              dangerouslySetInnerHTML={{ __html: docxContent }}
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "16px",
                fontFamily: "Arial, sans-serif",
              }}
            ></div>
          ) : (
            <p>Cargando detalles del documento...</p>
          )}
        </div>
      </main>
    </div>
  );
};

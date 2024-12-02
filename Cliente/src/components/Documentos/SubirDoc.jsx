import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export const SubirDoc = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    Folio_Documento: "",
    Tipo_Documento: "",
    Estado_Documento: "",
  });

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleregresar1 = () => {
    navigate(`/casos/${id}/documentos`);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("documento", file);
    data.append("Folio_Documento", formData.Folio_Documento);
    data.append("Tipo_Documento", formData.Tipo_Documento);
    data.append("Estado_Documento", formData.Estado_Documento);
    data.append("Caso_ID", id);

    try {
      const response = await axios.post("/api/documentos/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error al subir documento:", error);
      alert("Error al subir documento.");
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
        <h1 style={{ margin: 0, fontSize: "36px" }}>Subir Documento</h1>
        <div style={{ display: "flex", gap: "20px" }}>
          <button
            onClick={handleregresar1}
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
            Volver
          </button>
        </div>
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
            textAlign: "left",
          }}
        >
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="folio" style={{ fontWeight: "bold" }}>
              Folio del Documento:
            </label>
            <input
              type="text"
              name="Folio_Documento"
              id="folio"
              placeholder="Folio del Documento"
              value={formData.Folio_Documento}
              onChange={handleInputChange}
              className="form-control"
              required
              style={{ marginTop: "10px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
  <label htmlFor="tipo" style={{ fontWeight: "bold" }}>
    Tipo de Documento:
  </label>
  <select
    name="Tipo_Documento"
    id="tipo"
    value={formData.Tipo_Documento}
    onChange={handleInputChange}
    className="form-control"
    required
    style={{ marginTop: "10px" }}
  >
    <option value="">Seleccione un tipo</option>
    <option value="application/pdf">PDF</option>
    <option value="application/vnd.openxmlformats-officedocument.wordprocessingml.document">
      DOCX
    </option>
    <option value="text/plain">Texto</option>
  </select>
</div>


          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="estado" style={{ fontWeight: "bold" }}>
              Estado del Documento:
            </label>
            <input
              type="text"
              name="Estado_Documento"
              id="estado"
              placeholder="Estado del Documento"
              value={formData.Estado_Documento}
              onChange={handleInputChange}
              className="form-control"
              required
              style={{ marginTop: "10px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="archivo" style={{ fontWeight: "bold" }}>
              Archivo:
            </label>
            <input
              type="file"
              id="archivo"
              onChange={handleFileChange}
              className="form-control"
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
            Subir Documento
          </button>
        </form>
      </main>
    </div>
  );
};


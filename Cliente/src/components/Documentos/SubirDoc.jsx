import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const SubirDoc = () => {
  const { id } = useParams(); // Extrae el Caso_ID desde la URL
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    Folio_Documento: '',
    Tipo_Documento: '',
    Estado_Documento: '',
  });

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('documento', file);
    data.append('Folio_Documento', formData.Folio_Documento);
    data.append('Tipo_Documento', formData.Tipo_Documento);
    data.append('Estado_Documento', formData.Estado_Documento);
    data.append('Caso_ID', id);
  
    try {
      const response = await axios.post('/api/documentos/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error al subir documento:', error);
      alert('Error al subir documento.');
    }
  };
  

  return (
    <div>
      <h2>Subir Documento para el Caso</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Folio del Documento:</label>
          <input
            type="text"
            name="Folio_Documento"
            placeholder="Folio del Documento"
            value={formData.Folio_Documento}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Tipo de Documento:</label>
          <input
            type="text"
            name="Tipo_Documento"
            placeholder="Tipo de Documento"
            value={formData.Tipo_Documento}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Estado del Documento:</label>
          <input
            type="text"
            name="Estado_Documento"
            placeholder="Estado del Documento"
            value={formData.Estado_Documento}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Archivo:</label>
          <input type="file" onChange={handleFileChange} required />
        </div>
        <button type="submit">Subir Documento</button>
      </form>
    </div>
  );
};

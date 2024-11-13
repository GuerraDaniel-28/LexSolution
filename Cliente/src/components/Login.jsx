import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../css/login.module.css';
import { Link, useNavigate } from 'react-router-dom';

export const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'El nombre de usuario es requerido';
    if (!formData.password) newErrors.password = 'La contraseña es requerida';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });

        // Verifica la respuesta del servidor
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error de inicio de sesión');
        }

        // Obtén los datos del usuario
        const data = await response.json();
        localStorage.setItem('authToken', data.token); // Almacena el token en localStorage
        setIsAuthenticated(true); // Actualiza el estado de autenticación
        navigate('/dashboard'); // Redirige al dashboard después de iniciar sesión
      } catch (error) {
        setErrors({ form: error.message });
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-4 bg-dark p-4 rounded shadow">
            <h2 style={{ color: "#ffffff" }}>Iniciar Sesión</h2>
            {errors.form && <div className="alert alert-danger">{errors.form}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label" style={{ color: "#ffffff" }}>Nombre de Usuario</label>
                <input
                  type="text"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  style={{ backgroundColor: "#286181" }}
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label" style={{ color: "#ffffff" }}>Contraseña</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{ backgroundColor: "#286181" }}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-secondary">Iniciar Sesión</button>
                <Link to="/registro" className="btn btn-link" style={{ color: "#ffffff" }}>¿No tienes una cuenta? Regístrate</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

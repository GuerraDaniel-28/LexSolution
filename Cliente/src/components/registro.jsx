import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import styles from '../css/registro.module.css';

export const Registro = () => {
    const navigate = useNavigate(); // Inicializa useNavigate
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        contact: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'El nombre de usuario es requerido';
        if (!formData.email) {
            newErrors.email = 'El correo electrónico es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El correo electrónico no es válido';
        }
        if (!formData.contact) newErrors.contact = 'El número de contacto es requerido';
        if (!formData.password) newErrors.password = 'La contraseña es requerida';
        else if (formData.password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        Nombre_Usuario: formData.username,
                        Correo: formData.email,
                        Contacto: formData.contact,
                        Contrasena: formData.password,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Usuario registrado exitosamente:', data);
                    setFormData({ username: '', email: '', contact: '', password: '' });
                    setErrors({});
                    navigate('/login'); // Redirige al formulario de login
                } else {
                    console.error('Error al registrar el usuario');
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        }
    };

    return (
        <div className={styles.registrocontainer}>
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="col-md-4 bg-dark p-4 rounded shadow">
                        <h2 style={{ color: "#ffffff" }}>Registro</h2>
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
                                <label htmlFor="email" className="form-label" style={{ color: "#ffffff" }}>Correo Electrónico</label>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={{ backgroundColor: "#286181" }}
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contact" className="form-label" style={{ color: "#ffffff" }}>Número de Contacto</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.contact ? 'is-invalid' : ''}`}
                                    id="contact"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    style={{ backgroundColor: "#286181" }}
                                />
                                {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
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
                                <button type="submit" className="btn btn-secondary">Registrar</button> 
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

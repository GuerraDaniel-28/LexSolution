import React from 'react';
import Logo4 from '../Imagenes/logo4.png';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Barrain = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#04274b' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ fontFamily: 'Merriweather, serif', color: '#D4AF37', fontSize: '28px' }}>
          <img src={Logo4} alt="Logo" width="130" height="100" className="d-inline-block align-text-top" />
          
        </Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
         </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="ms-auto">
            <Link to="/Login" className="btn btn-outline-light me-2" > 
              Inicio de Sesión
            </Link>
            <Link to="/Registro" className="btn btn-primary" style={{ backgroundColor: '#04274b' , borderColor:"04274b" , width:"130" ,height:"100"}}>
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Bienvenida = () => {
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="display-4" style={{ fontFamily: 'Merriweather, serif', color: '#D4AF37' }}>
          Bienvenido a LexSolution
        </h1>
        <p className="lead">Tu plataforma integral para la gestión de clientes y casos legales</p>
      </div>

      <div className="row">
       
        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-body text-center">
              <h5 className="card-title">Casos</h5>
              <p className="card-text">Gestiona y visualiza tus casos activos</p>
              <a href="/casos" className="btn btn-primary">Ver Casos</a>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-body text-center">
              <h5 className="card-title">Clientes</h5>
              <p className="card-text">Administra los datos de tus clientes</p>
              <a href="/clientes" className="btn btn-primary">Ver Clientes</a>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-body text-center">
              <h5 className="card-title">Configuración</h5>
              <p className="card-text">Configura los datos de usuario</p>
              <a href="/perfil" className="btn btn-primary">Perfil</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

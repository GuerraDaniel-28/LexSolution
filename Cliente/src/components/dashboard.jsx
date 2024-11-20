// En tu componente Dashboard.jsx
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bienvenida } from './Bienvenida.jsx';


export const Dashboard = (onLogout ) => {
  const location = useLocation();

  // Definir rutas en las que queremos ocultar el mensaje de bienvenida
  const hideWelcomeMessageRoutes = [
    '/clientes',
    '/clientes/:id',
    '/agclientes',
    '/detclientes',
    '/casos',
    '/casos/nuevo',
    '/perfil',
    '/editarp',
  ];
  const shouldShowWelcomeMessage = !hideWelcomeMessageRoutes.includes(location.pathname);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      // Redirigir a la página de inicio de sesión si no hay token
      window.location.href = '/login';
      
    } else {
      // Aquí puedes verificar el token o realizar otras acciones
      console.log('Token encontrado:', token);
    }
  }, []);

  
    return (
      <div className="container" style={{ marginTop: '80px' }}>
        {shouldShowWelcomeMessage && <Bienvenida/>}
    <nav className="navbar bg-body-primary fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard" >Dashboard</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Navegación</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
              <li><Link className="dropdown-item" to="/perfil"> Usuario</Link></li>
              </li>
           
                  <li><Link className="dropdown-item" to="/clientes">Ver los clientes</Link></li>

                
                  <li><Link className="dropdown-item" to="/casos">Ver los Casos</Link></li>
                     <li>
                 
               
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
  
);
};

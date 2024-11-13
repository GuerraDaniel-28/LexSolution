import React, { useEffect, useState } from 'react';
import { Barrain } from './components/barrain.jsx';
import { Bajoin } from './components/bajoin.jsx';
import { Login } from './components/login.jsx';
import { Registro } from './components/registro.jsx';
import { Dashboard } from './components/dashboard.jsx';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Masbajoin } from './components/masbajoin.jsx';
import { Finin } from './components/finin.jsx';
import {Perfil} from './components/perfil.jsx';
import {TodosClientes} from './components/Clientes/TodosClientes.jsx';
import {AgregarCliente} from './components/Clientes/AgregarCliente.jsx';
import {DetallesCliente} from './components/Clientes/DetallesCliente.jsx';
import { ListaCasos} from './components/Casos/ListaCasos.jsx';
import { AñadirCaso } from './components/Casos/AñadirCaso.jsx';
import { DetallesCaso } from './components/Casos/DetallesCaso.jsx';
import {EditarPerfil} from './components/editarperfil.jsx';
export const Mrutas = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

  // Verifica si hay un token al cargar la página
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <Routes>
      {/* Ruta principal */}
      <Route path="/" element={
        <>
          <Barrain />
          <Bajoin />
          <Masbajoin />
          <Finin />
        </>
      } />

      <Route path="/login" element={
        <>
          <Barrain />
          <Login setIsAuthenticated={setIsAuthenticated} />
        </>
      } />

      {/* Ruta de registro */}
      <Route path="/registro" element={
        <>
          <Barrain />
          <Registro />
        </>
      } />

      {/* Ruta protegida de dashboard */}
      <Route path="/dashboard" element={
      
        isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />
        
      } />


            <Route path="/perfil" element={
              <>
              <Dashboard onLogout={handleLogout} />
              <Perfil />
              </>
              } />
            <Route path="/clientes" element={
              <>
              <Dashboard onLogout={handleLogout} />
              <TodosClientes />
              </>
              
              } />
            <Route path="/clientes/:id" element={
              <>
              <Dashboard onLogout={handleLogout} />
              <DetallesCliente />
              </>
              
              }/>
            <Route path="/agclientes" element={
              <>
              <Dashboard onLogout={handleLogout} />
              <AgregarCliente />
              </>
              
              } />
            <Route path="/detclientes" element={
              <>
              <Dashboard onLogout={handleLogout} />
              <DetallesCliente />
              </>
              
              } />
            <Route path="/casos" element={
              <>
              <Dashboard onLogout={handleLogout} />
              <ListaCasos />
              </>
              
              } />
            <Route path="/casos/nuevo" element={
              <>
              <Dashboard onLogout={handleLogout} />
              <AñadirCaso />
              </>
              
              } />
            <Route path="/casos/:id" element={
              <>
              <Dashboard onLogout={handleLogout} />
              <DetallesCaso />
              </>
              } />

            <Route path="/editarp" element={
              <>
              <Dashboard onLogout={handleLogout} />
              <EditarPerfil />
              </>
              } />

            

    </Routes>
  );
};

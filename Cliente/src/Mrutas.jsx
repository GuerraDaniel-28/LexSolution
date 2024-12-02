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
import { Bienvenida } from './components/Bienvenida.jsx';
import { ActualizarCliente } from './components/Clientes/ActualizarCliente.jsx';
import { EditarCaso } from './components/Casos/EditarCaso.jsx';
import  {SubirDoc} from './components/Documentos/SubirDoc.jsx';
import { DocumentosAsociados } from './components/Documentos/DocumentosAsociados.jsx';
import { DetallesDocumento } from './components/Documentos/DetallesDocumento.jsx';
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
          <Bajoin />
        </>
      } />

      <Route path="/login" element={
        <>
          <Login setIsAuthenticated={setIsAuthenticated} />
        </>
      } />

      {/* Ruta de registro */}
      <Route path="/registro" element={
        <>
          <Registro />
        </>
      } />

<Route 
  path="/dashboard" element={
    isAuthenticated ? (
      <>
        <Bienvenida onLogout={handleLogout}/>
      </>
    ) : (
      <Navigate to="/login" />
    )
  } 
/>



            <Route path="/perfil" element={
                  isAuthenticated ? (

              <>
              <Perfil onLogout={handleLogout} />
              </>
              ) : (
      <Navigate to="/login" />
    )
              } />


            <Route path="/clientes" element={
              isAuthenticated ? (
              <>
              <TodosClientes onLogout={handleLogout}/>
              </>
              ) : (
                <Navigate to="/login" />
              )
              } />

            <Route path="/clientes/:id" element={
              isAuthenticated ? (

              <>
              <DetallesCliente onLogout={handleLogout}/>
              </>
              ) : (
                <Navigate to="/login" />
              )
              }/>

            <Route path="/agclientes" element={
              isAuthenticated ? (

              <>
              <AgregarCliente onLogout={handleLogout}/>
              </>
              ) : (
      <Navigate to="/login" />
    )
              } />
            <Route path="/detclientes" element={
              isAuthenticated ? (

              <>
              <DetallesCliente onLogout={handleLogout}/>
              </>
              ) : (
                <Navigate to="/login" />
              )
              } />

              <Route path="/clientes/:id/editar" element={
              isAuthenticated ? (
              <>
              <ActualizarCliente onLogout={handleLogout}/>
              </>
              ) : (<Navigate to="/login" />)
              } />

            <Route path="/casos" element={
              isAuthenticated ? (

              <>
              <ListaCasos onLogout={handleLogout}/>
              </>
              ) : (
                <Navigate to="/login" />
              )
              } />
            <Route path="/casos/nuevo" element={
              isAuthenticated ? (

              <>
              <AñadirCaso onLogout={handleLogout}/>
              </>
              ) : (
                <Navigate to="/login" />
              )
              } />
            <Route path="/casos/:id" element={
              isAuthenticated ? (

              <>
              <DetallesCaso onLogout={handleLogout}/>
              </>
              ) : (
                <Navigate to="/login" />
              )
              } />


              <Route path="/casos/:id/editar" element={
                isAuthenticated ? (
  
                <>
                <EditarCaso onLogout={handleLogout}/>
                </>
                ) : (
                  <Navigate to="/login" />
                )
                } />


            <Route path="/editarp" element={
              isAuthenticated ? (

              <>
              <EditarPerfil onLogout={handleLogout}/>
              </>
              ) : (
                <Navigate to="/login" />
              )
              } />
          
            <Route path="/casos/:id/documentos" element={
              isAuthenticated ? (

              <>
              <DocumentosAsociados onLogout={handleLogout}/>
              </>
              ) : (
                <Navigate to="/login" />
              )
              } />
              
              <Route path="/casos/:id/documentos/subir" element={
                isAuthenticated ? (

                  <>
                  <SubirDoc onLogout={handleLogout}/>
                  </>
                  ) : (
                    <Navigate to="/login" />
                  )
                  } />

              <Route path="/casos/:id/documentos/:documentoId" element={
                isAuthenticated ? (

                  <>
                  <DetallesDocumento onLogout={handleLogout}/>
                  </>
                  ) : (
                    <Navigate to="/login" />
                  )
                  } />


    </Routes>
  );
};

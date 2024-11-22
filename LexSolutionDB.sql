DROP DATABASE IF EXISTS gestion_clientes;
CREATE DATABASE IF NOT EXISTS gestion_clientes;
USE gestion_clientes;

-- Tabla Usuarios
CREATE TABLE Usuarios (
    ID_Usuario INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Usuario VARCHAR(45),
    Correo VARCHAR(100),
    Contacto varchar(10),
    Contrasena VARCHAR(15)
);

-- Tabla Clientes
CREATE TABLE Clientes (
    ID_Cliente INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Cliente VARCHAR(45),
    Direccion VARCHAR(100),
    Telefono varchar(10),
    Email VARCHAR(100),
    Notas VARCHAR(255),
    Usuario_ID INT,
    FOREIGN KEY (Usuario_ID) REFERENCES Usuarios(ID_Usuario)
);

-- Tabla Casos
CREATE TABLE Casos (
    ID_Caso INT AUTO_INCREMENT PRIMARY KEY,
    Nombre varchar(45),
    Folio VARCHAR(45),
    Tipo_Caso VARCHAR(45),
    Estado VARCHAR(45),
    Fecha_Creacion DATE,
    Resumen_Caso VARCHAR(100),
    Cliente_ID INT,
    FOREIGN KEY (Cliente_ID) REFERENCES Clientes(ID_Cliente)
);

-- Tabla Documentos
CREATE TABLE Documentos (
    ID_Documento INT AUTO_INCREMENT PRIMARY KEY,
    Folio_Documento VARCHAR(45),
    Tipo_Documento VARCHAR(45),
    Fecha_Creacion DATE,
    Estado_Documento VARCHAR(45),
    Archivo LONGBLOB, -- Campo para almacenar el contenido del archivo
    Nombre_Archivo VARCHAR(255), -- Campo para almacenar el nombre del archivo
    Caso_ID INT,
    FOREIGN KEY (Caso_ID) REFERENCES Casos(ID_Caso)
);


-- Tabla Finanzas
CREATE TABLE Finanzas (
    ID_Finanzas INT AUTO_INCREMENT PRIMARY KEY,
    Fecha_Pago DATE,
    Cantidad DECIMAL(10, 2),
    Metodo_Pago VARCHAR(45),
    Usuario_ID INT,
    FOREIGN KEY (Usuario_ID) REFERENCES Usuarios(ID_Usuario)
);

-- Tabla Rendimiento
CREATE TABLE Rendimiento (
    ID_Rendimiento INT AUTO_INCREMENT PRIMARY KEY,
    Fecha_Rendimiento DATE,
    Medida_Rendimiento VARCHAR(45),
    Usuario_ID INT,
    FOREIGN KEY (Usuario_ID) REFERENCES Usuarios(ID_Usuario)
);

-- Tabla Historial_De_Revision
CREATE TABLE Historial_De_Revision (
    ID_Revision INT AUTO_INCREMENT PRIMARY KEY,
    Fecha_Revision DATE,
    Documento_ID INT,
    FOREIGN KEY (Documento_ID) REFERENCES Documentos(ID_Documento)
);

-- Tabla Firma_Electronica
CREATE TABLE Firma_Electronica (
    ID_Firma INT AUTO_INCREMENT PRIMARY KEY,
    Fecha DATE,
    Medio VARCHAR(100),
    Documento_ID INT,
    FOREIGN KEY (Documento_ID) REFERENCES Documentos(ID_Documento)
);

-- Tabla Calendario
CREATE TABLE Calendario (
    ID_Evento INT AUTO_INCREMENT PRIMARY KEY,
    Fecha_Evento DATE,
    Detalle_Evento VARCHAR(100),
    Cliente_ID INT,
    FOREIGN KEY (Cliente_ID) REFERENCES Clientes(ID_Cliente)
);

-- Consultas de prueba
SELECT * FROM Usuarios;
SELECT * FROM Clientes;
select * from casos;
select * from Documentos;

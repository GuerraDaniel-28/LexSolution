
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');


const app = express();
const port = 3000;

const JWT_SECRET = 'tu_clave_secreta'; 

// Habilitar CORS
app.use(cors({
    origin: 'http://localhost:5173'  
}));

app.use(express.json());

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    database: 'gestion_clientes'
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL.');
});

// middleware de autenticación
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token no válido' });
        req.user = user; 
        next();
    });
};


module.exports = authenticateToken;

// Ruta para registrar un nuevo usuario
app.post('/register', (req, res) => {
    const { Nombre_Usuario, Correo, Contacto, Contrasena } = req.body;

    const query = 'INSERT INTO Usuarios (Nombre_Usuario, Correo, Contacto, Contrasena) VALUES (?, ?, ?, ?)';
    const values = [Nombre_Usuario, Correo, Contacto, Contrasena];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al insertar usuario:', err);
            return res.status(500).json({ error: 'Error al registrar el usuario' });
        }
        res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.insertId });
    });
});

app.post('/logout', (req, res) => {
    res.clearCookie('token'); // Nombre de la cookie que contiene el JWT
    return res.status(200).json({ message: 'Sesión cerrada correctamente' });
});



// Ruta para actualizar el perfil de usuario
app.put('/edit-profile/:userId', (req, res) => {
    const { userId } = req.params;
    const { NombreUsuario, Correo, Contacto, Contrasena } = req.body;

    if (!NombreUsuario || !Correo || !Contacto || !Contrasena) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const query = 'UPDATE Usuarios SET Nombre_Usuario = ?, Correo = ?, Contacto = ?, Contrasena = ? WHERE ID_Usuario = ?';
    const values = [NombreUsuario, Correo, Contacto, Contrasena, userId];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al actualizar el perfil:', err);
            return res.status(500).json({ error: 'Error interno al actualizar el perfil del usuario' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Perfil actualizado exitosamente' });
    });
});

app.get('/usuario', authenticateToken, (req, res) => {
    const userId = req.user.id;

    const query = `
        SELECT ID_Usuario, Nombre_Usuario, Correo, Contacto
        FROM Usuarios
        WHERE ID_Usuario = ?
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener los datos del usuario:', err);
            return res.status(500).json({ error: 'Error al obtener los datos del usuario' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(results[0]); // Devuelve los datos del usuario
    });
});

// Ruta de inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Iniciando sesión con:', username); // Agregar esta línea

    const query = 'SELECT * FROM Usuarios WHERE Nombre_Usuario = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        
        console.log('Resultados de la consulta:', results); // Agregar esta línea

        if (results.length > 0) {
            const user = results[0];

            // Comparar la contraseña directamente
            if (user.Contrasena === password) {
                // Genera un token JWT con el ID del usuario
                const token = jwt.sign({ id: user.ID_Usuario, NombreUsuario: user.Nombre_Usuario , Correo: user.Correo , Contacto:user.Contacto }, JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({ message: 'Inicio de sesión exitoso', token });
            } else {
                res.status(401).json({ error: 'Contraseña incorrecta' });
            }
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    });
});
// Ruta para obtener todos los clientes de un usuario
app.get('/clientes', authenticateToken, (req, res) => {
    const query = 'SELECT ID_Cliente, Nombre_Cliente, Direccion, Telefono, Email, Notas FROM Clientes WHERE Usuario_ID = ?';
    db.query(query, [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en el servidor' });
        res.json(results);
    });
});

// Ruta para añadir un cliente
app.post('/clientes', authenticateToken, (req, res) => {
    const { Nombre_Cliente, Direccion, Telefono, Email, Notas } = req.body;
    const query = 'INSERT INTO Clientes (Nombre_Cliente, Direccion, Telefono, Email, Notas, Usuario_ID) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [Nombre_Cliente, Direccion, Telefono, Email, Notas, req.user.id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al añadir cliente' });
        res.status(201).json({ message: 'Cliente añadido exitosamente', clienteId: result.insertId });
    });
});

// Ruta para obtener detalles de un cliente
app.get('/clientes/:id', authenticateToken, (req, res) => {
    const query = 'SELECT ID_Cliente, Nombre_Cliente, Direccion, Telefono, Email, Notas FROM Clientes WHERE ID_Cliente = ? AND Usuario_ID = ?';
    db.query(query, [req.params.id, req.user.id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error en el servidor' });
        if (result.length === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
        res.json(result[0]);
    });
});
// Ruta para actualizar un cliente
app.put('/clientes/:id', authenticateToken, (req, res) => {
    const { Nombre_Cliente, Direccion, Telefono, Email, Notas } = req.body;
    const query = `
        UPDATE Clientes 
        SET Nombre_Cliente = ?, Direccion = ?, Telefono = ?, Email = ?, Notas = ?
        WHERE ID_Cliente = ? AND Usuario_ID = ?`;

    db.query(
        query,
        [Nombre_Cliente, Direccion, Telefono, Email, Notas, req.params.id, req.user.id],
        (err, result) => {
            if (err) {
                console.error("Error al actualizar cliente:", err);
                return res.status(500).json({ error: "Error al actualizar cliente" });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Cliente no encontrado o no autorizado para actualizar" });
            }
            res.json({ message: "Cliente actualizado exitosamente" });
        }
    );
});


// Ruta para borrar un cliente
app.delete('/clientes/:id', authenticateToken, (req, res) => {
    const clienteId = req.params.id;
    const userId = req.user.id;

    const deleteCasosQuery = 'DELETE FROM Casos WHERE Cliente_ID = ?';
    const deleteClienteQuery = 'DELETE FROM Clientes WHERE ID_Cliente = ? AND Usuario_ID = ?';

    // Eliminar los casos relacionados primero
    db.query(deleteCasosQuery, [clienteId], (err, result) => {
        if (err) {
            console.error("Error al eliminar casos relacionados:", err);
            return res.status(500).json({ error: 'Error al eliminar casos relacionados' });
        }

        // Luego eliminar el cliente
        db.query(deleteClienteQuery, [clienteId, userId], (err, result) => {
            if (err) {
                console.error("Error al borrar cliente:", err);
                return res.status(500).json({ error: 'Error al borrar cliente' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Cliente no encontrado o no autorizado para borrar' });
            }
            res.json({ message: 'Cliente borrado exitosamente' });
        });
    });
});



// Ruta para obtener todos los casos de un usuario
app.get('/casos', authenticateToken, (req, res) => {
    const query = `
        SELECT Casos.ID_Caso,Casos.Nombre, Casos.Folio, Casos.Tipo_Caso, Casos.Estado, Casos.Fecha_Creacion, Casos.Resumen_Caso, Clientes.Nombre_Cliente
        FROM Casos
        JOIN Clientes ON Casos.Cliente_ID = Clientes.ID_Cliente
        WHERE Clientes.Usuario_ID = ?;
    `;
    db.query(query, [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en el servidor' });
        res.json(results);
    });
});

app.post('/casos', authenticateToken, (req, res) => {
    const {Nombre, Folio, Tipo_Caso, Estado, Fecha_Creacion, Resumen_Caso, Cliente_ID } = req.body;
    const query = 'INSERT INTO Casos (Nombre, Folio, Tipo_Caso, Estado, Fecha_Creacion, Resumen_Caso, Cliente_ID) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [Nombre, Folio, Tipo_Caso, Estado, Fecha_Creacion, Resumen_Caso, Cliente_ID], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al añadir caso' });
        res.status(201).json({ message: 'Caso añadido exitosamente', casoId: result.insertId });
    });
});

// Ruta para obtener los detalles de un caso específico
app.get('/casos/:id', authenticateToken, (req, res) => {
    const query = `
        SELECT Casos.ID_Caso, Casos.Nombre , Casos.Folio, Casos.Tipo_Caso, Casos.Estado, Casos.Fecha_Creacion, Casos.Resumen_Caso, Clientes.Nombre_Cliente
        FROM Casos
        JOIN Clientes ON Casos.Cliente_ID = Clientes.ID_Cliente
        WHERE Casos.ID_Caso = ? AND Clientes.Usuario_ID = ?;
    `;
    db.query(query, [req.params.id, req.user.id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error en el servidor' });
        if (result.length === 0) return res.status(404).json({ error: 'Caso no encontrado' });
        res.json(result[0]);
    });
});

app.put('/casos/:id', authenticateToken, (req, res) => {
    const { Nombre, Folio, Tipo_Caso, Estado, Fecha_Creacion, Resumen_Caso, Cliente_ID } = req.body;
    const query = `
        UPDATE Casos 
        SET Nombre = ?, Folio = ?, Tipo_Caso = ?, Estado = ?, Fecha_Creacion = ?, Resumen_Caso = ?, Cliente_ID = ?
        WHERE ID_Caso = ? AND EXISTS (
            SELECT 1 
            FROM Clientes 
            WHERE Clientes.ID_Cliente = ? AND Clientes.Usuario_ID = ?
        );
    `;

    db.query(query, [Nombre, Folio, Tipo_Caso, Estado, Fecha_Creacion, Resumen_Caso, Cliente_ID, req.params.id, Cliente_ID, req.user.id], (err, result) => {
        if (err) {
            console.error("Error al actualizar caso:", err);
            return res.status(500).json({ error: 'Error al actualizar caso' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Caso no encontrado o no autorizado para actualizar' });
        }
        res.json({ message: 'Caso actualizado exitosamente' });
    });
});

app.delete('/casos/:id', authenticateToken, (req, res) => {
    const query = `
        DELETE FROM Casos 
        WHERE ID_Caso = ? AND EXISTS (
            SELECT 1 
            FROM Clientes 
            WHERE Clientes.ID_Cliente = Casos.Cliente_ID AND Clientes.Usuario_ID = ?
        );
    `;

    db.query(query, [req.params.id, req.user.id], (err, result) => {
        if (err) {
            console.error("Error al borrar caso:", err);
            return res.status(500).json({ error: 'Error al borrar caso' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Caso no encontrado o no autorizado para borrar' });
        }
        res.json({ message: 'Caso borrado exitosamente' });
    });
});
// Configuración de multer
const upload = multer({ storage: multer.memoryStorage() });

/**
 * Endpoint: Obtener documentos asociados a un caso
 */
app.get("/casos/:id/documentos", (req, res) => {
  const casoId = req.params.id;

  const query = `
    SELECT ID_Documento, Folio_Documento, Tipo_Documento, Estado_Documento, Nombre_Archivo, Fecha_Creacion
    FROM Documentos
    WHERE Caso_ID = ?
  `;

  db.query(query, [casoId], (err, results) => {
    if (err) {
      console.error("Error al obtener documentos asociados:", err);
      return res.status(500).json({ error: "Error al obtener documentos asociados." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No se encontraron documentos asociados a este caso." });
    }

    res.json(results);
  });
});

/**
 * Endpoint: Subir un documento
 */
app.post('/api/documentos/upload', upload.single('documento'), (req, res) => {
  const { Folio_Documento, Tipo_Documento, Estado_Documento, Caso_ID } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'No se envió un archivo.' });
  }

  const archivo = req.file.buffer; // Contenido del archivo en binario
  const nombreArchivo = req.file.originalname;

  const query = `
    INSERT INTO Documentos (Folio_Documento, Tipo_Documento, Fecha_Creacion, Estado_Documento, Archivo, Nombre_Archivo, Caso_ID)
    VALUES (?, ?, NOW(), ?, ?, ?, ?)
  `;
  const values = [Folio_Documento, Tipo_Documento, Estado_Documento, archivo, nombreArchivo, Caso_ID];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos:', err);
      return res.status(500).json({ error: 'Error al registrar el documento en la base de datos.' });
    }

    res.status(201).json({ message: 'Documento subido y registrado exitosamente.' });
  });
});

/**
 * Endpoint: Obtener detalles de un documento específico por ID
 */
app.get('/documentos/:folio', (req, res) => {
    const { folio } = req.params;
  
    const query = `
      SELECT Tipo_Documento, Archivo, Nombre_Archivo
      FROM Documentos
      WHERE Folio_Documento = ?
    `;
  
    db.query(query, [folio], (err, results) => {
      if (err) {
        console.error("Error al obtener detalles del documento:", err);
        return res.status(500).json({ error: "Error al obtener detalles del documento." });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: "Documento no encontrado." });
      }
  
      const { Tipo_Documento, Archivo, Nombre_Archivo } = results[0];
  
      // Configuración de cabeceras para enviar el archivo
      res.setHeader('Content-Disposition', `inline; filename="${Nombre_Archivo}"`);
      res.setHeader('Content-Type', Tipo_Documento);
      res.end(Archivo, 'binary');
    });
  });
  

/**
 * Endpoint: Listar documentos por Caso_ID (redundancia eliminada)
 */
app.get('/casos/:casoId/documentos', (req, res) => {
  const { casoId } = req.params;

  const query = `
    SELECT ID_Documento, Folio_Documento, Tipo_Documento, Fecha_Creacion, Estado_Documento, Nombre_Archivo
    FROM Documentos
    WHERE Caso_ID = ?
  `;

  db.query(query, [casoId], (err, results) => {
    if (err) {
      console.error("Error al recuperar los documentos:", err);
      return res.status(500).json({ message: "Error al recuperar los documentos." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No se encontraron documentos para este caso." });
    }

    res.json(results);
  });
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});


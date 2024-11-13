const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

const JWT_SECRET = 'tu_clave_secreta'; 

// Habilitar CORS
app.use(cors({
    origin: 'http://localhost:5173'  // Reemplaza con el origen de tu frontend
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
        req.user = user; // almacena el ID de usuario en `req.user`
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
// Ruta para actualizar el perfil de usuario
app.put('/edit-profile/:userId', (req, res) => {
    const { userId } = req.params;
    const { Nombre_Usuario, Correo, Contacto, Contrasena } = req.body;

    const query = 'UPDATE Usuarios SET Nombre_Usuario = ?, Correo = ?, Contacto = ?, Contrasena = ? WHERE ID_Usuario = ?';
    const values = [Nombre_Usuario, Correo, Contacto, Contrasena, userId];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al actualizar el perfil:', err);
            return res.status(500).json({ error: 'Error al actualizar el perfil del usuario' });
        }
        res.status(200).json({ message: 'Perfil actualizado exitosamente' });
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
    const query = 'SELECT * FROM Clientes WHERE Usuario_ID = ?';
    db.query(query, [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en el servidor' });
        res.json(results);
    });
});

// Ruta para añadir un cliente
app.post('/clientes', authenticateToken, (req, res) => {
    const { Nombre_Cliente, Direccion, Informacion_Contacto } = req.body;
    const query = 'INSERT INTO Clientes (Nombre_Cliente, Direccion, Informacion_Contacto, Usuario_ID) VALUES (?, ?, ?, ?)';
    db.query(query, [Nombre_Cliente, Direccion, Informacion_Contacto, req.user.id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al añadir cliente' });
        res.status(201).json({ message: 'Cliente añadido exitosamente', clienteId: result.insertId });
    });
});

// Ruta para obtener detalles de un cliente
app.get('/clientes/:id', authenticateToken, (req, res) => {
    const query = 'SELECT * FROM Clientes WHERE ID_Cliente = ? AND Usuario_ID = ?';
    db.query(query, [req.params.id, req.user.id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error en el servidor' });
        if (result.length === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
        res.json(result[0]);
    });
});

// Ruta para obtener todos los casos de un usuario
app.get('/casos', authenticateToken, (req, res) => {
    const query = `
        SELECT Casos.ID_Caso, Casos.Estado, Casos.Fecha_Creacion, Casos.Resumen_Caso, Clientes.Nombre_Cliente
        FROM Casos
        JOIN Clientes ON Casos.Cliente_ID = Clientes.ID_Cliente
        WHERE Clientes.Usuario_ID = ?;
    `;
    db.query(query, [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en el servidor' });
        res.json(results);
    });
});

// Ruta para añadir un nuevo caso
app.post('/casos', authenticateToken, (req, res) => {
    const { Estado, Fecha_Creacion, Resumen_Caso, Cliente_ID } = req.body;
    const query = 'INSERT INTO Casos (Estado, Fecha_Creacion, Resumen_Caso, Cliente_ID) VALUES (?, ?, ?, ?)';
    db.query(query, [Estado, Fecha_Creacion, Resumen_Caso, Cliente_ID], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al añadir caso' });
        res.status(201).json({ message: 'Caso añadido exitosamente', casoId: result.insertId });
    });
});

// Ruta para obtener los detalles de un caso específico
app.get('/casos/:id', authenticateToken, (req, res) => {
    const query = `
        SELECT Casos.ID_Caso, Casos.Estado, Casos.Fecha_Creacion, Casos.Resumen_Caso, Clientes.Nombre_Cliente
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

  
  
  


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});


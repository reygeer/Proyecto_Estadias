const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Configuración de conexión a tu base de datos MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root',      // Cambia esto a tu usuario MySQL
  password: '', // Cambia esto a tu contraseña MySQL
  database: 'proyect_inventario'
};

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute('SELECT * FROM clientes');
    await conn.end();
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

// Guardar un cliente nuevo
router.post('/guardar', async (req, res) => {
  const { nombre, email, telefono, direccion, imagen } = req.body;

  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO clientes (nombre, email, telefono, direccion, imagen) VALUES (?, ?, ?, ?, ?)';
    await conn.execute(sql, [nombre, email, telefono, direccion, imagen]);
    await conn.end();
    res.json({ mensaje: 'Cliente guardado correctamente' });
  } catch (error) {
    console.error('Error al guardar cliente:', error);
    res.status(500).json({ error: 'Error al guardar cliente' });
  }
});

// Actualizar un cliente existente
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { nombre, email, telefono, direccion, imagen } = req.body;

  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = 'UPDATE clientes SET nombre=?, email=?, telefono=?, direccion=?, imagen=? WHERE id=?';
    await conn.execute(sql, [nombre, email, telefono, direccion, imagen, id]);
    await conn.end();
    res.json({ mensaje: 'Cliente actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
});

// Eliminar un cliente
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = 'DELETE FROM clientes WHERE id = ?';
    await conn.execute(sql, [id]);
    await conn.end();
    res.json({ mensaje: 'Cliente eliminado' });
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
});

module.exports = router;

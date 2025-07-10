// routes/productos.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Proyect_inventario'  // o la base que uses para productos
});

// Obtener todos los productos
router.get('/', (req, res) => {
  conexion.query('SELECT * FROM productos', (err, resultados) => {
    if (err) return res.status(500).json(err);
    res.json(resultados);
  });
});

// Guardar producto
router.post('/guardar', (req, res) => {
  const { nombre, descripcion, precio, imagen } = req.body;
  conexion.query('INSERT INTO productos SET ?', { nombre, descripcion, precio, imagen }, (err) => {
    if (err) return res.status(500).json(err);
    res.send('Producto guardado');
  });
});

// Editar producto
router.put('/:id', (req, res) => {
  const id = req.params.id;
  conexion.query('UPDATE productos SET ? WHERE id = ?', [req.body, id], (err) => {
    if (err) return res.status(500).json(err);
    res.send('Producto actualizado');
  });
});

// Eliminar producto
router.delete('/:id', (req, res) => {
  conexion.query('DELETE FROM productos WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.send('Producto eliminado');
  });
});

module.exports = router;

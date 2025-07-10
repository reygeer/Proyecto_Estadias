const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Proyect_inventario'
});

// Obtener todos
router.get('/', (req, res) => {
  conexion.query('SELECT * FROM proveedores', (err, resultados) => {
    if (err) return res.status(500).json(err);
    res.json(resultados);
  });
});

// Guardar
router.post('/guardar', (req, res) => {
  const { nombre, direccion, telefono, rfc, imagen } = req.body;
  conexion.query('INSERT INTO proveedores SET ?', {
    nombre, direccion, telefono, rfc, imagen
  }, (err) => {
    if (err) return res.status(500).json(err);
    res.send('Proveedor guardado');
  });
});

// Editar
router.put('/:id', (req, res) => {
  const id = req.params.id;
  conexion.query('UPDATE proveedores SET ? WHERE id = ?', [req.body, id], (err) => {
    if (err) return res.status(500).json(err);
    res.send('Proveedor actualizado');
  });
});

// Eliminar
router.delete('/:id', (req, res) => {
  conexion.query('DELETE FROM proveedores WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.send('Proveedor eliminado');
  });
});

module.exports = router;

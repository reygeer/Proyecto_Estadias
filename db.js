// db.js
const mysql = require('mysql2');

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Proyect_inventario'
});

conexion.connect(err => {
  if (err) throw err;
  console.log('Conectado a MySQL');
});

module.exports = conexion;

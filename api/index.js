const express = require('express');
const cors = require('cors');
const app = express();

const proveedoresRoutes = require('./routes/proveedores');
const productosRoutes = require('./routes/productos');
const clientes = require('./routes/clientes');

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rutas
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/clientes', clientes);

// Servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

import express from 'express';
import { Productos } from '../services/producto';

const routes = express.Router();

const {
  getProductos,
  getProducto,
  saveProducto,
  updateProducto,
  deleteProducto,
} = new Productos();

routes.get('/productos/listar', async (req, res) => {
  try {
    const productos = await getProductos();
    if (productos.length !== 0) res.json({ data: productos });
    else throw new Error('No hay productos');
  } catch (e) {
    res.status(400).json({ error: e.error, message: e.message });
  }
});

routes.get('/productos/listar/:id', async (req, res) => {
  try {
    const producto = await getProducto(req.params.id);
    if (producto) res.json({ data: producto });
    else throw new Error('Producto no encontrado');
  } catch (e) {
    res.status(400).json({ error: e.error, message: e.message });
  }
});

routes.post('/productos/guardar', async (req, res) => {
  try {
    const producto = req.body;
    const newProducto = await saveProducto(producto);
    res.json({ data: newProducto });
  } catch (e) {
    res.status(400).json({ error: e.error, message: e.message });
  }
});

routes.put('/productos/actualizar/:id', async (req, res) => {
  try {
    const producto = await updateProducto(req.params.id, req.body);
    res.json({ data: producto });
  } catch (e) {
    res.status(404).json({ error: e.error, message: e.message });
  }
});

routes.delete('/productos/borrar/:id', async (req, res) => {
  try {
    await deleteProducto(req.params.id);
    const productos = await getProductos();
    res.json({ data: productos });
  } catch (e) {
    res.status(404).json({ error: e.error, message: e.message });
  }
});

export default routes;

import express, { Request, Response } from 'express';
import { IItem } from '../common/interfaces';
import { Productos } from '../services/producto';

const routes = express.Router();

const {
  getProductos,
  getProducto,
  saveProducto,
  updateProducto,
  deleteProducto,
} = new Productos();

routes.get(
  '/productos/listar',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const productos = await getProductos();
      if (productos.length !== 0) res.json({ data: productos });
      else res.json({ error: 'no hay productos cargados' });
    } catch (e) {
      res.json({ error: e });
    }
  }
);

routes.get(
  '/productos/listar/:id',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const producto = await getProducto(req.params.id);
      if (producto) res.json({ data: producto });
      else res.json({ error: 'Producto no encontrado' });
    } catch (e) {
      res.json({ error: e });
    }
  }
);

routes.post(
  '/productos/guardar',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const producto = req.body;
      await saveProducto(producto);
      res.redirect('/productos/vista');
    } catch (e) {
      res.json({ error: e });
    }
  }
);

routes.put(
  '/productos/actualizar/:id',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const producto = await updateProducto(req.params.id, req.body);
      res.json({ data: producto });
    } catch (e) {
      res.json({ error: e });
    }
  }
);

routes.delete(
  '/productos/borrar/:id',
  async (req: Request, res: Response): Promise<void> => {
    try {
      await deleteProducto(req.params.id);
      const productos = await getProductos();
      res.json({ data: productos });
    } catch (e) {
      res.json({ error: e });
    }
  }
);

export default routes;

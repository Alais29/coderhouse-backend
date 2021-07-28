import express, { Request, Response } from 'express';
import { Server } from 'http';
import { Productos } from './services/producto';
import { IItem } from './interfaces';

const app: express.Application = express();

const PORT = 8080;

const server: Server = app.listen(PORT, () => {
  console.log(`Servidor inicializado en el puerto ${PORT}`);
});
server.on('error', (error) => console.log(`Error en el servidor: ${error}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { getProductos, getProducto, saveProducto } = new Productos();

app.get(
  '/api/productos/listar',
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

app.get(
  '/api/productos/listar/:id',
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

app.post(
  '/api/productos/guardar',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const newProducto: IItem = await saveProducto(req.body);
      res.json({ data: newProducto });
    } catch (e) {
      res.json({ error: e });
    }
  }
);

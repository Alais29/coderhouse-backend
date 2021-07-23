import express, { Request, Response } from 'express';
import { promises as fsPromises } from 'fs';
import { Server } from 'http';

interface IItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

let visitasItems = 0;
let visitasItem = 0;

const app: express.Application = express();

const PORT = 8080;

const server: Server = app.listen(PORT, () => {
  console.log(`Servidor inicializado en el puerto ${PORT}`);
});
server.on('error', (error) => console.log(`Error en el servidor: ${error}`));

app.get(
  '/items',
  async (req: Request, res: Response): Promise<void> => {
    // debe mostrar un objeto con todos los productos y la cantidad total
    // { items: [productos], cantidad: (cantidad productos) }
    try {
      visitasItems++;
      const productos: string = await fsPromises.readFile(
        './productos.txt',
        'utf-8'
      );
      const data = {
        items: JSON.parse(productos),
        cantidad: JSON.parse(productos).length,
      };
      res.json(data);
    } catch (e) {
      throw new Error(e);
    }
  }
);

app.get(
  '/item-random',
  async (req: Request, res: Response): Promise<void> => {
    // debe devolver un producto elegido al azar
    // { item: { producto } }
    try {
      visitasItem++;
      const productos: string = await fsPromises.readFile(
        './productos.txt',
        'utf-8'
      );
      const productosJson: IItem[] = JSON.parse(productos);
      const randomNum: number = Math.floor(
        Math.random() * productosJson.length
      );
      const data: { item: IItem } = {
        item: productosJson[randomNum],
      };
      res.json(data);
    } catch (e) {
      throw new Error(e);
    }
  }
);

app.get('/visitas', (req: Request, res: Response): void => {
  // devuelve un objeto que indica cuantas veces se visitó la ruta del punto 1 y cuantas la ruta del punto 2
  // { visitas: { items: cantidad, item: cantidad } }
  try {
    res.json({
      visitas: {
        items: visitasItems,
        item: visitasItem,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
});

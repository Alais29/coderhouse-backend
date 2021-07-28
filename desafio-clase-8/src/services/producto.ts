import { promises as fsPromises } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { IItem } from '../interfaces';

export class Productos {
  async getProductos(): Promise<IItem[]> {
    try {
      const products = await fsPromises.readFile(
        `${__dirname}/../../productos.json`,
        'utf-8'
      );
      return JSON.parse(products);
    } catch (e) {
      throw new Error(e);
    }
  }

  async getProducto(id: string): Promise<IItem> {
    try {
      const productos = await fsPromises.readFile(
        `${__dirname}/../../productos.json`,
        'utf-8'
      );
      const productosJSON = JSON.parse(productos);
      const producto = productosJSON.find((item: IItem) => item.id === id);
      return producto;
    } catch (e) {
      throw new Error(e);
    }
  }

  async saveProducto(producto: IItem): Promise<IItem> {
    try {
      const productos = await fsPromises.readFile(
        `${__dirname}/../../productos.json`,
        'utf-8'
      );
      const productosJSON = JSON.parse(productos);

      producto.id = uuidv4();
      productosJSON.push(producto);

      await fsPromises.writeFile(
        `${__dirname}/../../productos.json`,
        JSON.stringify(productosJSON, null, '\t')
      );
      return producto;
    } catch (e) {
      throw new Error(e);
    }
  }
}

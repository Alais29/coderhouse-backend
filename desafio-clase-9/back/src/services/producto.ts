import { promises as fsPromises } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { IItem } from '../common/interfaces';

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
      const producto = productosJSON.filter((item: IItem) => item.id === id)[0];
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
      producto.price = Number(producto.price);
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

  async updateProducto(id: string, product: IItem): Promise<IItem> {
    try {
      const productos = await fsPromises.readFile(
        `${__dirname}/../../productos.json`,
        'utf-8'
      );
      const productosJSON = JSON.parse(productos);

      let productToUpdate = productosJSON.find((item: IItem) => item.id === id);
      productToUpdate = {
        ...productToUpdate,
        ...product,
      };

      const newProductList = productosJSON.filter(
        (item: IItem) => item.id !== id
      );
      newProductList.push(productToUpdate);

      await fsPromises.writeFile(
        `${__dirname}/../../productos.json`,
        JSON.stringify(newProductList, null, '\t')
      );
      return productToUpdate;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteProducto(id: string): Promise<IItem> {
    try {
      const productos = await fsPromises.readFile(
        `${__dirname}/../../productos.json`,
        'utf-8'
      );
      const productosJSON = JSON.parse(productos);

      const productToDelete = productosJSON.find(
        (item: IItem) => item.id === id
      );
      const newProductList = productosJSON.filter(
        (item: IItem) => item.id !== id
      );

      await fsPromises.writeFile(
        `${__dirname}/../../productos.json`,
        JSON.stringify(newProductList, null, '\t')
      );
      return productToDelete;
    } catch (e) {
      throw new Error(e);
    }
  }
}

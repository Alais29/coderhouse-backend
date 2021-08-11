import fs, { promises as fsPromises } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { IItem } from '../common/interfaces';
import { isUrl } from '../utils/strings';

const ProductosPath = path.resolve(__dirname, '../../productos.json');
export class Productos {
  async getProductos(): Promise<IItem[]> {
    try {
      const products = await fsPromises.readFile(ProductosPath, 'utf-8');
      return JSON.parse(products);
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar los productos' };
    }
  }

  async getProducto(id: string): Promise<IItem> {
    try {
      const productos = await fsPromises.readFile(ProductosPath, 'utf-8');
      const productosJSON = JSON.parse(productos);
      const producto = productosJSON.filter((item: IItem) => item.id === id)[0];
      return producto;
    } catch (e) {
      throw new Error(e);
    }
  }

  async saveProducto(producto: IItem): Promise<IItem> {
    try {
      const productos = await fsPromises.readFile(ProductosPath, 'utf-8');
      const productosJSON = JSON.parse(productos);

      producto.id = uuidv4();
      producto.price = Number(producto.price);

      if (isNaN(producto.price) || !isUrl(producto.thumbnail)) {
        throw new Error(
          'Verifica los datos, el precio debe ser un número y la url debe ser válida'
        );
      }

      if (fs.existsSync(ProductosPath)) {
        productosJSON.push(producto);
        await fsPromises.writeFile(
          ProductosPath,
          JSON.stringify(productosJSON, null, '\t')
        );
        return producto;
      } else {
        throw new Error('No se pudo guardar el producto');
      }
    } catch (e) {
      if (e.code) {
        throw { error: e, message: 'No se pudo guardar el producto' };
      } else {
        throw Error(e.message);
      }
    }
  }

  async updateProducto(id: string, producto: IItem): Promise<IItem> {
    try {
      const productos = await fsPromises.readFile(ProductosPath, 'utf-8');
      const productosJSON = JSON.parse(productos);

      producto.price = Number(producto.price);

      if (isNaN(producto.price) || !isUrl(producto.thumbnail)) {
        throw new Error(
          'Verifica los datos, el precio debe ser un número y la url debe ser válida'
        );
      }

      let productToUpdate = productosJSON.find((item: IItem) => item.id === id);
      productToUpdate = {
        ...productToUpdate,
        ...producto,
      };

      const newProductList = productosJSON.filter(
        (item: IItem) => item.id !== id
      );
      newProductList.push(productToUpdate);

      if (fs.existsSync(ProductosPath)) {
        await fsPromises.writeFile(
          ProductosPath,
          JSON.stringify(newProductList, null, '\t')
        );
        return productToUpdate;
      } else {
        throw new Error('No se pudo actualizar el producto');
      }
    } catch (e) {
      if (e.code) {
        throw {
          error: e,
          message: 'No se pudo actualizar el producto',
        };
      } else {
        throw Error(e.message);
      }
    }
  }

  async deleteProducto(id: string): Promise<IItem> {
    try {
      const productos = await fsPromises.readFile(ProductosPath, 'utf-8');
      const productosJSON = JSON.parse(productos);

      const newProductList = productosJSON.filter(
        (item: IItem) => item.id !== id
      );

      if (fs.existsSync(ProductosPath)) {
        await fsPromises.writeFile(
          ProductosPath,
          JSON.stringify(newProductList, null, '\t')
        );
        return newProductList;
      } else {
        throw new Error('No se pudo borrar el producto');
      }
    } catch (e) {
      if (e.code) {
        throw {
          error: e,
          message: 'No se pudo borrar el producto',
        };
      } else {
        throw Error(e.message);
      }
    }
  }
}

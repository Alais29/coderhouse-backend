// Implementar programa que contenga una clase llamada Archivo que reciba el nombre del archivo con el que va a trabajar e implemente los métodos leer, guardar, borrar.

// Utilizar guardar para incorporar productos al archivo "productos.txt"
// El formato de cada producto será:

// {
//     title: (nombre del producto),
//     price: (precio),
//     thumbnail: (url de la foto)
// }

// La función guardar incorporará al producto un id, el cual se obtendrá de la longitud total del array actual más 1.
// Con el método leer se mostrará en consola el listado total(si el archivo existe) como un array de productos.Si el archivo no existe, se retornará un array vacío.
// El método borrar elimina el archivo completo.
// Implementar el manejo de archivos con el módulo fs de node.js, utilizando promesas con async await y manejo de errores.

const fsPromises = require('fs').promises
const fs = require('fs')

class Archivo {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo + '.txt'
  }

  async leer() {
    try {
      if (fs.existsSync(this.nombreArchivo)) {
        // si el archivo existe mostrar un array de productos 
        const data = await fsPromises.readFile(`./${this.nombreArchivo}`, 'utf-8')
        const dataJson = JSON.parse(data)
        console.log(dataJson)
      } else {
        //si no existe retornar array vacío
        console.log('Archivo no existe', [])
      }
    } catch (e) {
      throw new Error(`Hubo un error: ${e}`)
    }
  }

  async guardar(title, price, thumbnail) {
    // incorpora productos al archivo
    let id;
    try {
      if (!fs.existsSync(this.nombreArchivo)) {
        // si el archivo no existe, el id es 1
        id = 1
        const dataToSave = {
          id,
          title,
          price,
          thumbnail
        }
        await fsPromises.appendFile(`./${this.nombreArchivo}`, JSON.stringify([dataToSave], null, '\t'))
        console.log(`Producto ${title} guardado con éxito`)
      } else {
        //si existe, el id debe ser la cantidad de objetos actuales más 1
        const data = await fsPromises.readFile(`./${this.nombreArchivo}`, 'utf-8')
        const dataJson = JSON.parse(data)
        id = dataJson.length + 1

        const dataToSave = [
          ...dataJson,
          {
            id,
            title,
            price,
            thumbnail
          }
        ]

        await fsPromises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(dataToSave, null, '\t'))
        console.log(`Producto ${title} guardado con éxito`)
      }
    } catch (e) {
      throw new Error(`Hubo un error: ${e}`)
    }
  }

  async borrar() {
    //elimina el archivo por completo
    try {
      await fsPromises.unlink(`./${this.nombreArchivo}`)
    } catch (e) {
      throw new Error(`Hubo un error: ${e}`)
    }
  }

}

const prueba = new Archivo('productos')
prueba.guardar('Escuadra', 123.45, 'www.test.com/escuadra.png')
  .then(() => prueba.guardar('Calculadora', 234.56, 'www.test.com/calculadora.png'))
  .then(() => prueba.guardar('Globo Terráqueo', 345.67, 'www.test.com/globo-terraqueo.png'))
  .then(() => prueba.leer())
  // .then(() => prueba.borrar())


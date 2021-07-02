function Usuario(nombre, apellido, libros, mascotas) {
  this.nombre = nombre
  this.apellido = apellido
  this.libros = libros
  this.mascotas = mascotas

  this.getFullName = function () {
    return `${this.nombre} ${this.apellido}`
  }
  this.addMascota = function (mascota) {
    this.mascotas.push(mascota)
  }
  this.getMascotas = function () {
    return this.mascotas.length
  }
  this.addBook = function (book, autor) {
    this.libros.push({
      nombre: book,
      autor
    })
  }
  this.getBooks = function () {
    return this.libros.map(book => book.nombre)
  }
}

const usuario = new Usuario('Alfonsina', 'Lizardo', [], []);

// getFullName
console.log(usuario.getFullName())

// addMascota, getMascotas
usuario.addMascota('loro')
usuario.addMascota('perro')
usuario.addMascota('gato')
console.log(usuario.getMascotas())

// addBook, getBooks
usuario.addBook('Angeles y Demonios', 'Dan Brown')
usuario.addBook('El Código Da vinci', 'Dan Brown')
usuario.addBook('Harry Potter', 'JK Rowling')
console.log(usuario.getBooks())
class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre
    this.apellido = apellido
    this.libros = libros
    this.mascotas = mascotas
  }
  getFullName() {
    return `${this.nombre} ${this.apellido}`
  }
  addMascota(mascota) {
    this.mascotas.push(mascota)
  }
  getMascotas() {
    return this.mascotas.length
  }
  addBook(book, autor) {
    this.libros.push({
      nombre: book,
      autor
    })
  }
  getBooks() {
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
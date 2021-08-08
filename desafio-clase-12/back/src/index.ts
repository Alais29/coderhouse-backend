/* eslint-disable @typescript-eslint/no-var-requires */
import express, { Request, Response } from 'express';
import cors from 'cors';
import * as http from 'http';
import * as socketio from 'socket.io';
import path from 'path';
import routes from './routes';
import { Productos } from './services/producto';

const app: express.Application = express();
const PORT = 8080;

// const server = app.listen(PORT, () => {
//   console.log(`Servidor inicializado en el puerto ${PORT}`);
// });
// server.on('error', (error) => console.log(`Error en el servidor: ${error}`));

const { getProductos, saveProducto } = new Productos();

const server: http.Server = http.createServer(app);
const io: socketio.Server = new socketio.Server();
io.attach(server);

app.use(express.static(path.resolve(__dirname, '../', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', routes);
io.on('connection', async (socket: socketio.Socket) => {
  console.log('Nueva conexión');
  try {
    const productos = await getProductos();
    socket.emit('productos', productos);
  } catch {
    socket.emit('productos error', {
      error: 'Hubo un problema al listar los productos',
    });
  }

  socket.on('new product', (newProduct) => {
    saveProducto(newProduct)
      .then(() => {
        getProductos()
          .then((productos) => {
            io.emit('productos', productos);
          })
          .catch(() => {
            socket.emit('productos error', {
              error: 'Hubo un problema al listar los productos',
            });
          });
      })
      .catch(() => {
        socket.emit('save producto error', {
          error: 'Hubo un problema al agregar el producto',
        });
      });
  });
});

server.listen(PORT, () => {
  console.log(`Servidor inicializado en http://localhost:${PORT}`);
});
server.on('error', (error) => console.log(`Error en el servidor: ${error}`));

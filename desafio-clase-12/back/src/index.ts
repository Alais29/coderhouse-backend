import express from 'express';
import cors from 'cors';
import * as http from 'http';
import * as socketio from 'socket.io';
import path from 'path';
import routes from './routes';
import { Productos } from './services/producto';

const app: express.Application = express();
const PORT = 8080;

const { getProductos, saveProducto } = new Productos();

const server: http.Server = http.createServer(app);
const io: socketio.Server = new socketio.Server();
io.attach(server);

server.listen(PORT, () => {
  console.log(`Servidor inicializado en http://localhost:${PORT}`);
});
server.on('error', (error) => console.log(`Error en el servidor: ${error}`));

app.use(express.static(path.resolve(__dirname, '../', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', routes);

const mensajes = [
  {
    email: 'juan@gmail.com',
    text: '¡Hola! ¿Que tal?',
    date: new Date(),
  },
  {
    email: 'pedro@gmail.com',
    text: '¡Muy bien! ¿Y vos?',
    date: new Date(),
  },
  {
    email: 'ana@gmail.com',
    text: '¡Genial!',
    date: new Date(),
  },
];

io.on('connection', async (socket: socketio.Socket) => {
  console.log('Nueva conexión');
  try {
    const productos = await getProductos();
    socket.emit('productos', productos);
  } catch (e) {
    socket.emit('productos error', {
      error: e.error,
      message: e.message,
    });
  }

  socket.emit('messages', mensajes);
  socket.on('new message', (newMessage) => {
    newMessage.date = new Date();
    mensajes.push(newMessage);
    io.emit('messages', mensajes);
  });

  socket.on('new product', (newProduct) => {
    saveProducto(newProduct)
      .then(() => {
        socket.emit('success', null);
        getProductos()
          .then((productos) => {
            io.emit('productos', productos);
          })
          .catch((e) => {
            socket.emit('productos error', {
              error: e.error,
              message: e.message,
            });
          });
      })
      .catch((e) => {
        socket.emit('save producto error', {
          error: e.error,
          message: e.message,
        });
      });
  });
});

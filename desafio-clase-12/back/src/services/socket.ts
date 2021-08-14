import * as socketio from 'socket.io';
import * as http from 'http';
import { Productos } from './producto';
import { Messages } from './messages';

const { getProductos, saveProducto } = new Productos();
const { getMessages, saveMessage } = new Messages();

export const initWsServer = (server: http.Server): void => {
  const io: socketio.Server = new socketio.Server();
  io.attach(server);

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

    try {
      const messages = await getMessages();
      socket.emit('messages', messages);
    } catch (e) {
      socket.emit('messages error', {
        error: e.error,
        message: e.message,
      });
    }

    socket.on('new product', (newProduct) => {
      saveProducto(newProduct)
        .then(() => {
          socket.emit('save product success', null);
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

    socket.on('new message', (newMessage) => {
      saveMessage(newMessage)
        .then(() => {
          socket.emit('save message success', null);
          getMessages()
            .then((messages) => {
              io.emit('messages', messages);
            })
            .catch((e) => {
              socket.emit('messages error', {
                error: e.error,
                message: e.message,
              });
            });
        })
        .catch((e) => {
          socket.emit('save message error', {
            error: e.error,
            message: e.message,
          });
        });
    });
  });
};

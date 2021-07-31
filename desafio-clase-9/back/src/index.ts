import express from 'express';
import path from 'path';
import { Server } from 'http';
import routes from './routes';

const app: express.Application = express();
const PORT = 8080;

const server: Server = app.listen(PORT, () => {
  console.log(`Servidor inicializado en el puerto ${PORT}`);
});
server.on('error', (error) => console.log(`Error en el servidor: ${error}`));

app.use(express.static(path.resolve(__dirname, '../', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

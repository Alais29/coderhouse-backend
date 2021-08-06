import express from 'express';
import { Server } from 'http';
import routes from './routes';
import { Productos } from './services/producto';

const app: express.Application = express();
const PORT = 8080;

const { getProductos } = new Productos();

const server: Server = app.listen(PORT, () => {
  console.log(`Servidor inicializado en el puerto ${PORT}`);
});
server.on('error', (error) => console.log(`Error en el servidor: ${error}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

app.use('/api', routes);
app.get('/productos/vista', async (req, res) => {
  const products = await getProductos();
  res.render('index', { data: products, productsExist: products.length !== 0 });
});

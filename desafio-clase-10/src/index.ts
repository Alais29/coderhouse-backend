import express from 'express';
import { Server } from 'http';
import path from 'path';
import routes from './routes';
import handlebars from 'express-handlebars';
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

app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: path.resolve(__dirname, '../', 'views/', 'layouts/'),
    partialsDir: path.resolve(__dirname, '../', 'views/', 'partials/'),
  })
);

app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('public'));

app.use('/api', routes);
app.get('/productos/vista', async (req, res) => {
  const products = await getProductos();
  res.render('main', { data: products, productsExist: products.length !== 0 });
});
app.get('/productos/agregar', async (req, res) => {
  res.render('addProduct');
});

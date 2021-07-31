import { useState, useEffect } from 'react';
import { IItem } from './interfaces';
import { getProducts } from './services/Productos';
import { Container } from 'react-bootstrap';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

const App = () => {
  const [productos, setProductos] = useState<IItem[] | []>([])

  useEffect(() => {
    getProducts()
      .then(products => {
        setProductos(products)
      })
  }, [])

  return (
    <Container>
      <ProductForm productos={productos} setProductos={setProductos} />
      {productos.length !== 0 &&
        <ProductList productos={productos} />
      }
    </Container>
  );
}

export default App;
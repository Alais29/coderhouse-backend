import { useState, useEffect } from 'react';
import { socket } from './services/socket';
import { IItem, IAlert } from './commons/interfaces';
// import { getProducts } from './services/Productos';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import ProductForm from './components/ProductForm/ProductForm';
import ProductList from './components/ProductList/ProductList';
import ChatChannel from './components/ChatChannel/ChatChannel';

const App = () => {
  const [productos, setProductos] = useState<IItem[] | []>([])
  const [alert, setAlert] = useState<IAlert>({ show: false, text: '' })
  
  useEffect(() => {
    // getProducts()
    // .then(products => {
    //   setProductos(products)
    //   setAlert({ show: false, text: '' })
    // })
    // .catch((e) => {
    //   setAlert({show: true, text: e.message})
    // })
    socket.on('productos', (data) => {
      setProductos(data)
      setAlert({show: false, text: ''})
    });
    socket.on('productos error', (data) => {
      setAlert({show: true, text: data.message})
    });

    return () => {
      socket.disconnect();
    }
  }, [])

  return (
    <Container>
      <Row>
        <Col lg="8" sm="12">
          <ProductForm productos={productos} setProductos={setProductos} />
          {productos.length !== 0
            ? <ProductList productos={productos} />
            : alert.show && <Alert variant='danger'>{alert.text}</Alert>
          }
        </Col>
        <Col lg="4" sm="12">
          <ChatChannel />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
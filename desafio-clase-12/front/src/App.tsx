import { useState, useEffect } from 'react';
import socketClient  from "socket.io-client";
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
    //   setAlert({show: false, text: ''})
    // })
    // .catch(() => {
    //   setAlert({show: true, text: 'Hubo un problema al listar los productos'})
    // })
    const socket = socketClient('/');
    socket.on('productos', (data) => {
      setProductos(data)
      setAlert({show: false, text: ''})
    });
    socket.on('productos error', (data) => {
      setAlert({show: true, text: data.error})
    });
  }, [])

  return (
    <Container>
      <Row>
        <Col sm='12' md='8'>
          <ProductForm productos={productos} setProductos={setProductos} />
          {productos.length !== 0
            ? <ProductList productos={productos} />
            : alert.show && <Alert variant='danger'>{alert.text}</Alert>
          }
        </Col>
        <Col sm='12' md='4'>
          <ChatChannel />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
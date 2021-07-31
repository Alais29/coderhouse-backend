import { Card, Col, Row } from 'react-bootstrap';
import { IItem } from '../interfaces';
import { getRandomNumber } from '../utilities/numbers';

interface IProductList {
  productos: IItem[]
}

const ProductList = ({ productos }: IProductList) => {
  return (
    <Row>
      {productos.map((producto: IItem) => (
        <Col xs={12} sm={6} md={3} key={producto.id} className="mb-4">
          <Card>
            <Card.Img variant="top" src={`${producto.thumbnail}?random=${getRandomNumber(1, 1000)}`} />
            <Card.Body>
              <Card.Title>{producto.title}</Card.Title>
              <Card.Text>${producto.price}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default ProductList
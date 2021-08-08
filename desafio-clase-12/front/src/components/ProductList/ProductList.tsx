import React from 'react'
import { Table } from 'react-bootstrap';
import { IItem } from '../../commons/interfaces';
import cx from 'classnames/bind'
import styles from './styles.module.scss'

interface IProductList {
  productos: IItem[]
}

const ProductList = ({ productos }: IProductList) => {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Imagen</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto: IItem) => (
          <tr key={producto.id}>
            <td>{producto.title}</td>
            <td>{producto.price}</td>
            <td>
              <img className={cx(styles['product-img'])} src={producto.thumbnail} alt={producto.title} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default ProductList
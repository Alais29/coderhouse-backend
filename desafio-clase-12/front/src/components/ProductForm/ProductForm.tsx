import React, { Dispatch, SetStateAction, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { IItem, IAlert } from '../../commons/interfaces';
import { isEmpty } from '../../utilities/others'
// import { saveProduct } from '../../services/Productos';
import socketClient  from "socket.io-client";

interface IProductForm {
  setProductos: Dispatch<SetStateAction<IItem[]>>
  productos: IItem[]
}

const ProductForm = ({ productos, setProductos }: IProductForm) => {
  const [alert, setAlert] = useState<IAlert>({show: false, text: ''})
  const [formValues, setFormValues] = useState({
    title: '',
    price: '',
    thumbnail: ''
  });

  const { title, price, thumbnail } = formValues
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const {title, price, thumbnail} = formValues    
    // saveProduct(formValues)
    //   .then((newProduct) => {
    //     setProductos([
    //       ...productos,
    //       newProduct
    //     ])
    //     setFormValues({ title: '', price: '', thumbnail: '' })
    //     setAlert({show: false, text: ''})
    //   })
    //   .catch((e) => {
    //     setAlert({ show: true, text: e.message })
    //   })

    const socket = socketClient('/');
    if (isEmpty(title) || isEmpty(price) || isEmpty(thumbnail)) {
      setAlert({ show: true, text: 'Todos los campos son requeridos' })
    } else {
      socket.emit('new product', formValues)
      socket.on('success', () => {
        setFormValues({ title: '', price: '', thumbnail: '' })
      })
    }
    socket.on('productos', (productos: IItem[]) => {
      setProductos(productos)
      setAlert({ show: false, text: '' })
    })
    socket.on('productos error', (data) => {
      setAlert({show: true, text: data.message})
    });
    socket.on('save producto error', (data) => {
      setAlert({show: true, text: data.message})
    });
  }

  return (
    <>
      <h1 className="text-center">Agrega un producto</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" value={title} name="title" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="text" value={price} name="price" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="thumbnail">
          <Form.Label>URL de imagen</Form.Label>
          <Form.Control type="url" value={thumbnail} name="thumbnail" onChange={handleChange} />
        </Form.Group>
        {alert.show && <Alert variant="danger">{alert.text}</Alert>}
        <Button type="submit" className="mb-2">
          Guardar
        </Button>
      </Form>
    </>
  )
}

export default ProductForm

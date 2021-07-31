import React, { Dispatch, SetStateAction, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { IItem } from '../interfaces';
import { saveProduct } from '../services/Productos';

interface IProductForm {
  setProductos: Dispatch<SetStateAction<IItem[]>>
  productos: IItem[]
}

const ProductForm = ({ productos, setProductos }: IProductForm) => {
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
    saveProduct(formValues)
      .then((newProduct) => {
        setProductos([
          ...productos,
          newProduct
        ])
        setFormValues({ title: '', price: '', thumbnail: '' })
      })
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
          <Form.Control type="number" value={price} name="price" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="thumbnail">
          <Form.Label>URL de imagen</Form.Label>
          <Form.Control type="url" value={thumbnail} name="thumbnail" onChange={handleChange} />
        </Form.Group>
        <Button type="submit" className="mb-2">
          Guardar
        </Button>
      </Form>
    </>
  )
}

export default ProductForm

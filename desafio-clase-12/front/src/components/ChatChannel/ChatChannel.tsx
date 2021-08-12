import { useEffect, useState } from 'react';
import moment from 'moment';
import {socket} from '../../services/socket'
import { Button, Form } from 'react-bootstrap'
import cx from 'classnames/bind'
import styles from './styles.module.scss'

// const mensajesMock = [
//   { email: "juan@gmail.com", text: "¡Hola! ¿Que tal?", date: moment().format('DD/MM/YYYY, h:mm:ss a') },
//   { email: "pedro@gmail.com", text: "¡Muy bien! ¿Y vos?", date: moment().format('DD/MM/YYYY, h:mm:ss a') },
//   { email: "ana@gmail.com", text: "¡Genial!", date: moment().format('DD/MM/YYYY, h:mm:ss a') },
// ]

interface IMessage {
  email: string
  text: string
  date: Date
}

const ChatChannel = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    text: ''
  });
  const [messages, setMessages] = useState<IMessage[]>([])

  useEffect(() => {
    socket.on('messages', (data) => {
      setMessages(data)
    })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO form is not resetting on submit
    // setFormValues({
    //   ...formValues,
    //   text: ''
    // })
    socket.emit('new message', formValues)
    socket.on('messages', (data) => {
      setMessages(data)
    })
  }

  return (
    <div className={cx(styles['chat-channel'])}>
      <h1>Centro de Mensajes</h1>
      <div className={cx(styles['chat-channel__messages'])}>
        {messages.map((msg, index) => (
          <div key={index} className={cx(styles['chat-channel__message'])}>
            <p>
              <span className={cx(styles['chat-channel__message-email'])}>{msg.email}: </span>
              <span className={cx(styles['chat-channel__message-text'])}>{msg.text}</span>
            </p>
            <small className={cx(styles['chat-channel__message-date'])}>{moment(msg.date).format('DD/MM/YYYY, h:mm:ss a')}</small>
          </div>
        ))}
      </div>
      <Form onSubmit={handleSubmit}>
        <div className={cx(styles['chat-channel__form'])}>
          <Form.Control onChange={handleChange} name="email" type="email" placeholder="Email" />
          <Form.Control onChange={handleChange} name="text" type="text" placeholder="Ingresa un mensaje" />
          <Button className="w-100" variant="primary" type="submit">Enviar</Button>
        </div>
      </Form>
    </div>
  )
}

export default ChatChannel

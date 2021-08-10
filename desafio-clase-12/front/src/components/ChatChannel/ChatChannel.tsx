import moment from 'moment';
import { Button, Form } from 'react-bootstrap'
import cx from 'classnames/bind'
import styles from './styles.module.scss'

const mensajesMock = [
  { email: "juan@gmail.com", text: "¡Hola! ¿Que tal?", date: moment().format('DD/MM/YYYY, h:mm:ss a') },
  { email: "pedro@gmail.com", text: "¡Muy bien! ¿Y vos?", date: moment().format('DD/MM/YYYY, h:mm:ss a') },
  { email: "ana@gmail.com", text: "¡Genial!", date: moment().format('DD/MM/YYYY, h:mm:ss a') },
]

const ChatChannel = () => {
  return (
    <div className={cx(styles['chat-channel'])}>
      <h1>Centro de Mensajes</h1>
      <div className={cx(styles['chat-channel__messages'])}>
        {mensajesMock.map(msg => (
          <div className={cx(styles['chat-channel__message'])}>
            <p>
              <span className={cx(styles['chat-channel__message-email'])}>{msg.email}: </span>
              <span className={cx(styles['chat-channel__message-text'])}>{msg.text}</span>
            </p>
            <small className={cx(styles['chat-channel__message-date'])}>{msg.date}</small>
          </div>
        ))}
      </div>
      <Form>
        <div className={cx(styles['chat-channel__form'])}>
          <Form.Control type="email" placeholder="Email" />
          <Form.Control type="text" placeholder="Ingresa un mensaje" />
          <Button className="w-100" variant="primary">Enviar</Button>
        </div>
      </Form>
    </div>
  )
}

export default ChatChannel

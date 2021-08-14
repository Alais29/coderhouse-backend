import fs, { promises as fsPromises } from 'fs';
import moment from 'moment';
import path from 'path';
import { isEmail } from '../utils/strings';

const messagesPath = path.resolve(__dirname, '../../mensajes.json');
export class Messages {
  async getMessages() {
    try {
      const messages = await fsPromises.readFile(messagesPath, 'utf-8');
      return JSON.parse(messages);
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar los mensajes' };
    }
  }

  async saveMessage(message) {
    try {
      const messages = await fsPromises.readFile(messagesPath, 'utf-8');
      const messagesJSON = JSON.parse(messages);

      message.date = moment().format('DD/MM/YYYY, h:mm:ss a');

      if (!isEmail(message.email)) {
        throw new Error('Ingresa un email válido');
      }

      if (fs.existsSync(messagesPath)) {
        messagesJSON.push(message);
        await fsPromises.writeFile(
          messagesPath,
          JSON.stringify(messagesJSON, null, '\t')
        );
        return message;
      } else {
        throw new Error('No se pudo guardar el mensaje');
      }
    } catch (e) {
      if (e.code) {
        throw { error: e, message: 'No se pudo guardar el mensaje' };
      } else {
        throw Error(e.message);
      }
    }
  }
}

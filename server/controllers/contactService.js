import models from '../models';
import utils from '../utils';

const { logger } = utils;

const Contact = models.Contacts;

export default {
  async createContact(req, res) {
    const { name, email, phone } = req.body;
    Contact.create({
      name, email, phone
    })
  }
}

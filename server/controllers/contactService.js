import models from '../models';
import utils from '../utils';

const { handleServerError, handleServerResponse } = utils;

const { Contact, User } = models;

export default {
  /**
   * @method createContact
   * @param {*} req request object
   * @param {*} res response object
   * @description creates a new request using values provided in the req.body
   *  and saves a document in the database
   * @returns {*} response of error or success
   */
  async createContact(req, res) {
    try {
      const { name, email, phone } = req.body;
      const contact = await Contact.create({
        name: name.trim().toLowerCase(),
        email,
        phone,
        userId: req.decoded.id
      });
      return res.status(201).send({
        success: true,
        message: 'contact succesfully created',
        contact
      });
    } catch (error) {
      return handleServerError(res, error);
    }
  },
  /**
   *
   * @param {*} req request object
   * @param {*} res response object
   * @description get details of one contact
   * @returns {*} success or error
   */
  async getOneContact(req, res) {
    const { contactId } = req.params;
    try {
      const contact = await Contact.findByPk(contactId);
      if (contact) {
        return res.status(200).send({
          success: true,
          contact
        });
      }
      return res.status(404).send({
        success: false,
        message: `Contact with id- ${contactId} does not found`
      });
    } catch (error) {
      return handleServerError(res, error);
    }
  },
  /**
   *
   * @param {*} req request object
   * @param {*} res response object
   * @description get all user contacts
   * @returns {*} success with list of contacts  or error message
   */
  async getAllContacts(req, res) {
    const { id } = req.decoded;
    try {
      const contacts = await Contact.findAll({
        where: {
          userId: id
        }
      });
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User does not exist'
        });
      }
      if (!contacts || contacts.length < 1) {
        return res.status(200).send({
          success: true,
          message: 'You curently have no contact to display'
        });
      }
      return handleServerResponse(res, 200, { contacts });
    } catch (error) {
      handleServerError(res, error);
    }
  },

  async starContact(req, res) {
    const { contactId } = req.params;
    try {
      const contact = Contact.findByPk(contactId);
      if (contact) {
        const starredContact = await Contact.update({ isStarred: true }, {
          where: {
            id: contactId
          }
        });
        return handleServerResponse(res, 200, { starredContact, success: true });
      }
      return handleServerResponse(res, 404, { success: true, message: `contact with id- ${contactId} does not exist` });
    } catch (error) {
      handleServerError(res, error);
    }
  },

  async getAllStarredContacts(req, res) {
    try {
      const starredContacts = await Contact.findAll({
        where: {
          isStarred: true,
          userId: req.decoded.id
        }
      });
      if (!starredContacts || starredContacts.length < 1) {
        return res.status(200).send({
          success: true,
          message: 'You curently have no starred contact to display'
        });
      }
      return handleServerResponse(res, 200, { success: true, starredContacts });
    } catch (error) {
      handleServerError(res, error);
    }
  },

  async editContact(req, res) {
    const { name, email, phone } = req.body;
    const { contactId } = req.params;
    try {
      const contact = await Contact.findOne({ where: { id: contactId, userId: req.decoded.id } });
      if (contact) {
        if (!contact.email.includes(email)) {
          contact.email.push(email);
        }
        if (!contact.phone.includes(phone)) {
          contact.phone.push(phone);
        }
        const updatedContact = await contact.update(
          { name, phone: contact.phone, email: contact.email }, {
            where: {
              id: contactId
            }
          }
        );
        return handleServerResponse(res, 202, { updatedContact });
      }
    } catch (error) {
      handleServerError(res, error);
    }
  },

  async deleteContact(req, res) {
    const { contactId } = req.params;
    try {
      const contact = await Contact.findOne({ where: { id: contactId } });
      if (contact) {
        if (contact.userId === req.decoded.id) {
          contact.destroy();
         
          return handleServerResponse(res, 202, { message: 'Contact successfully deleted' });
        }
        return handleServerResponse(res, 403, { message: 'You don\'t have permision to perform such action' });
      }
      return handleServerResponse(res, 404, { message: `Contact with id - ${contactId} not found` })
    } catch (error) {
      handleServerError(res, error);
    }
  }
};

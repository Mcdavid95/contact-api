import models from '../models';
import utils from '../../utils';

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
        name,
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
      return handleServerResponse(res, 200, { contacts })
    } catch (error) {
      handleServerError(res, error);
    }
  }
};

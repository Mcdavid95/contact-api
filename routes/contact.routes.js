import express from 'express';
import ContactService from '../server/controllers/contactService';
import utils from '../utils';

const router = express.Router();
const {
  hasToken, contactInput, getOneContactInput, updateInput, deleteInput
} = utils;
const {
  createContact,
  getOneContact,
  getAllContacts, starContact, getAllStarredContacts, editContact, deleteContact
} = ContactService;

router.post('', hasToken, contactInput, createContact);
router.get('', hasToken, getAllContacts);
router.get('/star', hasToken, getAllStarredContacts);
router.get('/:contactId', hasToken, getOneContactInput, getOneContact);
router.patch('/:contactId/star', hasToken, getOneContactInput, starContact);
router.patch('/:contactId', hasToken, updateInput, editContact);
router.delete('/:contactId', hasToken, deleteInput, deleteContact);

export default router;

import express from 'express';
import ContactService from '../server/controllers/contactService';
import utils from '../utils';

const router = express.Router();
const { hasToken, contactInput, getOneContactInput } = utils;
const { createContact, getOneContact, getAllContacts } = ContactService;

router.post('', hasToken, contactInput, createContact);
router.get('', hasToken, getAllContacts);
router.get('/:contactId', hasToken, getOneContactInput, getOneContact);

export default router;

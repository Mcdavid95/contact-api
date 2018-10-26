import express from 'express';
import UserService from '../server/controllers/userService';
import utils from '../server/utils';

const router = express.Router();
const { signupInput, signInInput } = utils;
const { register, login } = UserService;

router.post('/signup', signupInput, register);
router.post('/signin', signInInput, login);

export default router;

import express from 'express';
import UserService from '../server/controllers/userService';
import utils from '../server/utils';

const router = express.Router();
const { signupInput, signInInput, forgotPasswordInput } = utils;
const { register, login, forgotPassword, resetPassword } = UserService;

router.post('/signup', signupInput, register);
router.post('/signin', signInInput, login);
router.patch('/forgot-password', forgotPasswordInput, forgotPassword);
router.patch('/reset-password/:passwordToken', resetPassword );


export default router;

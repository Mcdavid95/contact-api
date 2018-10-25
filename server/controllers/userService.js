import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import models from '../models';
import utils from '../../utils';

const {
  createToken, handleServerError, handleServerResponse
} = utils;


dotenv.config();

const { User } = models;

const saltRounds = process.env.SALT;

export default {
  /**
   * @method register
   * @param { object } req
   * @param { object } res
   * @returns { object } returns the response
   * @description recieves user details and create an instance of the User Model in the database
   */
  async register(req, res) {
    const { username, email, password } = req.body;
    try {
      const isEmail = await User.findOne({
        where: {
          email: email.trim().toLowerCase()
        }
      });
      if (isEmail) {
        return handleServerResponse(res, 404, { sucsess: false, message: 'Email already in use' });
      }
      const hash = await bcrypt.hash(password, parseInt(saltRounds, 10));
      const newUser = await User.create({
        username: username.trim().toLowerCase(),
        password: hash,
        email: email.trim().toLowerCase()
      });
      return handleServerResponse(res, 201, { token: createToken(newUser.id, newUser.username), sucsess: true, message: 'User succesfully created' });
    } catch (error) {
      return handleServerError(res, error);
    }
  },

  /**
   * @method login
   * @param { object } req
   * @param { object } res
   * @returns { object } returns the object containing response and jwt token
   * @description recieves user details and checks if it exists in the database and returns a token
   */
  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await User
        .findOne({
          where:
        { username: username.trim().toLowerCase() }
        });
      if (!user) {
        return handleServerResponse(res, 401, { message: 'Username not correct' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return handleServerResponse(res, 401, { message: 'Incorrect Password' });
      }
      return res.status(202).send({
        token: createToken(user.id, user.username),
        message: `Welcome back ${user.username}`
      });
    } catch (error) {
      return handleServerError(res, error);
    }
  }

};

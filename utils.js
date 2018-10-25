import jwt from 'jsonwebtoken';
import bunyan from 'bunyan';
import validator from 'validator';

export default {
  /**
   * createToken
   * @param {Number} id user id gotten from database
   * @param {String} username username of logged user
   * @description creates new jwt token for authentication
   * @returns {String} newly created jwt
   */
  createToken(id, username) {
    const token = jwt.sign(
      {
        id,
        username
      },
      process.env.SECRET
    );
    return token;
  },

  /**
   * logger
   * @returns {Object} object containing logger functions
   */
  logger() {
    const log = bunyan.createLogger({ name: 'myapp' });
    return log;
  },
  /**
   * @method signupInput
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} response
   */
  signupInput(req, res, next) {
    const { username, password, email } = req.body;
    if (typeof (username) === 'undefined') {
      return res.status(401).json({
        message: 'Username field must not be empty'
      });
    } if (typeof (password) === 'undefined') {
      return res.status(401).send({
        message: 'Password field must not be empty'
      });
    } if (typeof (email) === 'undefined') {
      return res.status(401).send({
        message: 'Email field must not be empty'
      });
    } if (!validator.isEmail(req.body.email)) {
      return res.status(401).send({
        message: 'Please put in a proper email address'
      });
    }
    return next();
  },
  /**
   * @method signInInput
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {*} response
   */
  signInInput(req, res, next) {
    const { username, password } = req.body;
    if (typeof (username) === 'undefined') {
      return res.status(401).json({
        message: 'Username field must not be empty'
      });
    } if (typeof (password) === 'undefined') {
      return res.status(401).send({
        message: 'Password field must not be empty'
      });
    }
    return next();
  },
  /**
   * @method contactInput
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {*} response
   */
  contactInput(req, res, next) {
    const { name } = req.body;
    if (typeof (name) === 'undefined') {
      return res.status(401).json({
        message: 'Name field must not be empty'
      });
    }
    return next();
  },
  /**
  * @method getOneContact
  * @param {Object} req
  * @param {Object} res
  * @param {*} next
  * @returns {*} response
  */
  getOneContactInput(req, res, next) {
    const { contactId } = req.params;
    if (typeof (contactId) === 'undefined') {
      return res.status(401).json({
        message: 'contactId must be provided in params not be empty: /contact/:contactId/'
      });
    } if (!validator.isNumeric(contactId)) {
      return res.status(401).json({
        message: 'contactId should be a number'
      });
    }
    return next();
  },
  // /**
  // * @method updateInput
  // * @param {Object} req
  // * @param {Object} res
  // * @param {*} next
  // * @returns {*} response
  // */
  // updateInput(req, res, next) {
  //   const { title } = req.body;
  //   const { id } = req.params;
  //   if (typeof (id) === 'undefined') {
  //     return res.status(401).json({
  //       message: 'id must be provided in params not be empty: /book/:id/'
  //     });
  //   } if (isNaN(parseInt(id, 10))) {
  //     return res.status(401).json({
  //       message: 'id should be a number'
  //     });
  //   } if (typeof (title) === 'undefined') {
  //     return res.status(401).json({
  //       message: 'Title field must not be empty'
  //     });
  //   }
  //   return next();
  // },
  // /**
  // * @method deleteInput
  // * @param {Object} req
  // * @param {Object} res
  // * @param {*} next
  // * @returns {*} response
  // */
  // deleteInput(req, res, next) {
  //   const { id } = req.params;
  //   if (typeof (id) === 'undefined') {
  //     return res.status(401).json({
  //       message: 'id must be provided in params not be empty: /book/:id/'
  //     });
  //   } if (isNaN(parseInt(id, 10))) {
  //     return res.status(401).json({
  //       message: 'id should be a number'
  //     });
  //   }
  //   return next();
  // },
  /**
   * @method hasToken
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {Object} response object
   */
  hasToken(req, res, next) {
    const token = req.body.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).send({
            success: false,
            message: err
          });
        }
        req.decoded = decoded;
        return next();
      });
    } else {
      return res.status(403).send({
        message: 'You have to be loggedin first'
      });
    }
  },

  handleServerError(response, error) {
    const log = bunyan.createLogger({ name: 'myapp' });
    log.error(error);
    return response.status(500).send({
      success: false,
      message: 'Internal Server Error'
    });
  },

  handleServerResponse(response, status, object) {
    return response.status(status).send(object);
  }
};

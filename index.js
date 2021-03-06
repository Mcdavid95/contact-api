import express from 'express';
import logger from 'morgan';
import { json, urlencoded } from 'body-parser';
import userRoutes from './routes/user.routes';
import contactRoutes from './routes/contact.routes';

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/api/user', userRoutes);
app.use('/api/contact', contactRoutes);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;

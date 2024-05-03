import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import patientRoutes from './routes/Patient';
import reservationsRoutes from './routes/Reservation';
import loginRoute from './routes/Login';
import emailRoute from './routes/Email';

const router = express();
// Connect to mongoDB
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    Logging.info('Connected to mongoDB.');
    StartServer();
  })
  .catch((error) => {
    Logging.error('Unable to connect');
    Logging.error(error);
  });

const StartServer = () => {
  router.use((req, res, next) => {
    Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
      Logging.info(`Outgoing -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  // Rules of API
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }

    next();
  });

  router.use('/login', loginRoute);

  router.use((req, res, next) => {
    if (req.headers.authorization === 'Bearer ' + process.env.LOGIN_TOKEN || '') {
      console.log('Authorized');
      next();
    } else {
      console.log('Unauthorized');
      return res.status(401).json({ message: 'Autorizácia zlyhala' });
    }
  });

  router.use('/patients', patientRoutes);
  router.use('/reservations', reservationsRoutes);
  router.use('/email', emailRoute);

  router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

  router.use((req, res, next) => {
    const error = new Error('Root path not found');
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });

  http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};

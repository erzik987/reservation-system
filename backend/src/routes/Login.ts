import express from 'express';
import controller from '../controllers/Login';

const router = express.Router();

router.post('/', controller.login);

export = router;

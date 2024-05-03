import express from 'express';
import controller from '../controllers/Emails';

const router = express.Router();

router.post('/sendMail', controller.sendMail);

export = router;

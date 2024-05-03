import express from 'express';
import controller from '../controllers/Patient';

const router = express.Router();

router.post('/create', controller.createPatient);
router.get('/get/:patientId', controller.readPatient);
router.get('/get/', controller.readAll);
router.get('/search/', controller.searchPatients);
router.patch('/update/:patientId', controller.updatePatient);
router.delete('/delete/:patientId', controller.deletePatient);

export = router;

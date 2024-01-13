import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Patient from '../models/Patient';

const createPatient = (req: Request, res: Response, next: NextFunction) => {
  const patientReq = req.body;

  const patient = new Patient({
    _id: new mongoose.Types.ObjectId(),
    firstName: patientReq.firstName,
    lastName: patientReq.lastName,
    email: patientReq.email
  });

  return patient
    .save()
    .then((patient) => res.status(201).json({ patient }))
    .catch((error) => res.status(500).json({ error }));
};

const readPatient = (req: Request, res: Response, next: NextFunction) => {
  const patientId = req.params.patientId;

  return Patient.findById(patientId)
    .then((patient) => (patient ? res.status(200).json({ patient }) : res.status(404).json({ message: 'not found' })))
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Patient.find()
    .then((patients) => res.status(200).json({ patients }))
    .catch((error) => res.status(500).json({ error }));
};

const updatePatient = (req: Request, res: Response, next: NextFunction) => {
  const patientId = req.params.patientId;

  return Patient.findById(patientId)
    .then((patient) => {
      if (patient) {
        patient.set(req.body);

        return patient
          .save()
          .then((patient) => res.status(201).json({ patient }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: 'not found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deletePatient = (req: Request, res: Response, next: NextFunction) => {
  const patientId = req.params.patientId;

  return Patient.findByIdAndDelete(patientId)
    .then((patient) => (patient ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'not found' })))
    .catch((error) => res.status(500).json({ error }));
};

export default { createPatient, readPatient, readAll, updatePatient, deletePatient };

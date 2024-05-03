import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Patient from '../models/Patient';
import { IResponseMessage } from '../models/ResponseMessage';

const createPatient = async (req: Request, res: Response, next: NextFunction) => {
  const patientReq = req.body;

  const existingPatient = await Patient.findOne({
    email: { $eq: patientReq.email }
  });

  const patient = new Patient({
    _id: new mongoose.Types.ObjectId(),
    firstName: patientReq.firstName,
    lastName: patientReq.lastName,
    email: patientReq.email,
    state: patientReq.state
  });

  if (existingPatient) {
    const errorResponse: IResponseMessage = {
      displayMessage: `Pacient s mailom ${existingPatient.email} už existuje`,
      message: `Patient with id ${existingPatient._id} already uses this email`,
      response: existingPatient
    };

    res.status(500).json(errorResponse);
  } else {
    patient
      .save()
      .then((patient) => res.status(201).json({ patient }))
      .catch((error) => res.status(500).json({ error }));
  }
};

const readPatient = (req: Request, res: Response, next: NextFunction) => {
  const patientId = req.params.patientId;

  return Patient.findById(patientId)
    .then((patient) => (patient ? res.status(200).json({ patient }) : res.status(404).json({ message: 'not found2' })))
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
        res.status(404).json({ message: 'not found1' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const searchPatients = (req: Request, res: Response, next: NextFunction) => {
  const searchPhrase = req.query.searchPhrase?.toString() || '';
  const regex = new RegExp(searchPhrase, 'i');

  return Patient.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }, { email: { $regex: regex } }]
  })
    .then((patients) => res.status(200).json({ patients }))
    .catch((error) => res.status(500).json({ error }));
};

const deletePatient = (req: Request, res: Response, next: NextFunction) => {
  const patientId = req.params.patientId;

  return Patient.findByIdAndDelete(patientId)
    .then((patient) => (patient ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'not found3' })))
    .catch((error) => res.status(500).json({ error }));
};

export default { createPatient, readPatient, readAll, updatePatient, searchPatients, deletePatient };

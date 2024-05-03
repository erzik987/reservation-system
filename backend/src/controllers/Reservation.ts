import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Reservation from '../models/Reservation';
import { IResponseMessage } from '../models/ResponseMessage';

const createReservation = async (req: Request, res: Response, next: NextFunction) => {
  const reservationReq = req.body;

  const existingReservation = await checkExistingReservation(req);

  const reservation = new Reservation({
    _id: new mongoose.Types.ObjectId(),
    firstName: reservationReq.firstName,
    lastName: reservationReq.lastName,
    email: reservationReq.email,
    patientId: reservationReq.patientId,
    duration: reservationReq.duration,
    reservedDate: reservationReq.reservedDate,
    visitReasons: reservationReq.visitReasons,
    reservedStartTime: reservationReq.reservedStartTime,
    reservedEndTime: reservationReq.reservedEndTime,
    pacientNotes: reservationReq.pacientNotes
  });

  if (existingReservation) {
    const errorResponse: IResponseMessage = {
      displayMessage: 'Tento čas a dátum nie je možné rezervovať z dôvodu už existujúcej rezervácie',
      message: `range is not available - reservation with id ${existingReservation._id} for user ${existingReservation.email} already exist`,
      response: existingReservation
    };

    res.status(500).json(errorResponse);
  } else {
    reservation
      .save()
      .then((reservation) => res.status(201).json({ reservation }))
      .catch((error) => res.status(500).json({ error }));
  }
};

const readReservation = (req: Request, res: Response, next: NextFunction) => {
  const reservationId = req.params.reservationId;

  return Reservation.findById(reservationId)
    .then((reservation) => (reservation ? res.status(200).json({ reservation }) : res.status(404).json({ message: 'not found' })))
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Reservation.find()
    .then((reservations) => res.status(200).json({ reservations }))
    .catch((error) => res.status(500).json({ error }));
};

const searchReservations = (req: Request, res: Response, next: NextFunction) => {
  const searchPhrase = req.query.searchPhrase?.toString() || '';
  const regex = new RegExp(searchPhrase, 'i');

  return Reservation.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }]
  })
    .then((reservations) => res.status(200).json({ reservations }))
    .catch((error) => res.status(500).json({ error }));
};

const readForDate = (req: Request, res: Response, next: NextFunction) => {
  return Reservation.find({
    'reservedDate.year': req.body.year,
    'reservedDate.month': req.body.month,
    'reservedDate.dayInMonth': req.body.dayInMonth
  })
    .then((reservations) => res.status(200).json({ reservations }))
    .catch((error) => res.status(500).json({ error }));
};

const updateReservation = async (req: Request, res: Response, next: NextFunction) => {
  const reservationId = req.params.reservationId;

  const existingReservation = await checkExistingReservation(req);

  if (existingReservation) {
    const errorResponse: IResponseMessage = {
      displayMessage: 'Tento čas a dátum nie je možné rezervovať z dôvodu už existujúcej rezervácie',
      message: `range is not available - reservation with id ${existingReservation._id} for user ${existingReservation.email} already exist`,
      response: existingReservation
    };

    return res.status(500).json(errorResponse);
  }

  return Reservation.findById(reservationId)
    .then((reservation) => {
      if (reservation) {
        reservation.set(req.body);

        return reservation
          .save()
          .then((reservation) => res.status(201).json({ reservation }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        const errorResponse: IResponseMessage = {
          displayMessage: 'Túto rezerváciu nebolo možné nájsť',
          message: `reservation with id ${reservationId} was not found`,
          response: reservation
        };

        res.status(404).json(errorResponse);
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteReservation = (req: Request, res: Response, next: NextFunction) => {
  const reservationId = req.params.reservationId;

  return Reservation.findByIdAndDelete(reservationId)
    .then((reservation) => (reservation ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'not found4' })))
    .catch((error) => res.status(500).json({ error }));
};

const checkExistingReservation = async (req: Request) => {
  const reservationReq = req.body;
  const existingReservation = await Reservation.findOne({
    $and: [
      {
        $and: [
          { 'reservedDate.dayInMonth': { $eq: reservationReq.reservedDate.dayInMonth } },
          { 'reservedDate.month': { $eq: reservationReq.reservedDate.month } },
          { 'reservedDate.year': { $eq: reservationReq.reservedDate.year } }
        ]
      },
      {
        $or: [
          {
            $and: [{ reservedStartTime: { $lt: reservationReq.reservedStartTime } }, { reservedEndTime: { $gt: reservationReq.reservedStartTime } }]
          },
          {
            $and: [{ reservedStartTime: { $lt: reservationReq.reservedEndTime } }, { reservedEndTime: { $gt: reservationReq.reservedEndTime } }]
          }
        ]
      }
    ]
  });

  return existingReservation;
};

export default { createReservation, readReservation, readAll, readForDate, updateReservation, deleteReservation, searchReservations };

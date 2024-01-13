import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Reservation, { Time } from '../models/Reservation';
import Helper from '../library/Helper';
import { IResponseMessage } from '../models/ResponseMessage';

// const response: IResponseMessage = {

// }

const createReservation = async (req: Request, res: Response, next: NextFunction) => {
  const reservationReq = req.body;

  // const startTime = Helper.getTotalMinutesFromTime(reservationReq.reservedTime);
  // const endTime = Helper.getTotalMinutesFromTime(reservationReq.reservedTime) + reservationReq.duration;

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
    reservationState: reservationReq.reservationState
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

const readForDate = (req: Request, res: Response, next: NextFunction) => {
  return Reservation.find({
    'reservedDate.year': req.body.year,
    'reservedDate.month': req.body.month,
    'reservedDate.dayInMonth': req.body.dayInMonth
  })
    .then((reservations) => res.status(200).json({ reservations }))
    .catch((error) => res.status(500).json({ error }));
};

const updateReservation = (req: Request, res: Response, next: NextFunction) => {
  const reservationId = req.params.reservationId;

  return Reservation.findById(reservationId)
    .then((reservation) => {
      if (reservation) {
        reservation.set(req.body);

        return reservation
          .save()
          .then((reservation) => res.status(201).json({ reservation }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: 'not found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteReservation = (req: Request, res: Response, next: NextFunction) => {
  const reservationId = req.params.reservationId;

  return Reservation.findByIdAndDelete(reservationId)
    .then((reservation) => (reservation ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'not found' })))
    .catch((error) => res.status(500).json({ error }));
};

export default { createReservation, readReservation, readAll, readForDate, updateReservation, deleteReservation };

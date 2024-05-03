import mongoose, { Document, Schema } from 'mongoose';

export interface IReservation {
  firstName: string;
  lastName: string;
  email: string;
}

export interface Time {
  hours: number;
  minutes: number;
}

export interface IReservationModel extends IReservation, Document {}

const ReservationSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: false },
    patientId: { type: mongoose.Types.ObjectId, required: false },
    duration: { type: Number, required: true },
    reservedDate: { type: Object, required: true },
    visitReasons: { type: Array<String>, required: true },
    reservedStartTime: { type: Number, required: true },
    reservedEndTime: { type: Number, required: true },
    pacientNotes: { type: String, required: false }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export default mongoose.model<IReservationModel>('Reservation', ReservationSchema);

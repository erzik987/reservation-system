import mongoose, { Document, Schema } from 'mongoose';

export interface IPatient {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IPatientModel extends IPatient, Document {}

const PatientSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: false },
    state: { type: String, required: true }
  },
  {
    versionKey: false
  }
);

export default mongoose.model<IPatientModel>('Patient', PatientSchema);

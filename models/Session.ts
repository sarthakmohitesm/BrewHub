import mongoose, { Schema, Model } from 'mongoose';

export interface ISession {
  _id?: string;
  customerName: string;
  tableName: string;
  loginCode: string;
  loggedInAt: Date;
  active: boolean;
}

const SessionSchema = new Schema<ISession>(
  {
    customerName: { type: String, required: true },
    tableName: { type: String, default: 'Walk-in' },
    loginCode: { type: String, required: true },
    loggedInAt: { type: Date, default: Date.now },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Session: Model<ISession> =
  mongoose.models.Session || mongoose.model<ISession>('Session', SessionSchema);
export default Session;

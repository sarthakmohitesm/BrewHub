import mongoose, { Schema, Model } from 'mongoose';
import { ITable } from '@/types';

const TableSchema = new Schema<ITable>(
  {
    customerName: { type: String, required: true },
    tableName: { type: String, required: true },
    loginCode: { type: String, default: '' },
    approved: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Table: Model<ITable> = mongoose.models.Table || mongoose.model<ITable>('Table', TableSchema);
export default Table;

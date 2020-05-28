import { Document, Schema } from 'mongoose';
import { CarSize } from '../../../models/car';

export interface CarModel extends Document {
  name: string;
  age: number;
  breed: string;
}

export const CarSchema = new Schema({
  plateNumber: String,
  carSize: {
    type: CarSize,
    enum: [CarSize.SMALL, CarSize.MEDIUM, CarSize.LARGE],
  },
});

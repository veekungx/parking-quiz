import { Schema, Document, Types } from 'mongoose';
import { CarModel } from './car.schema';

export interface ParkingLotModel extends Document {
  slots: Map<number, CarModel>;
}

export const ParkingLotSchema = new Schema({
  slots: {
    type: Map,
  },
});

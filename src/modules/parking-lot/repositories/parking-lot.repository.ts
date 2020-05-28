import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ParkingLot } from '../../../models/parking-lot';
import { ParkingLotHasBeenCreatedError } from '../../../errors/parking-lot-has-been-created.error';
import { ParkingLotNotExistsError } from '../../../errors/parking-lot-not-exists.error';
import { ParkingLotModel } from '../schemas/parking-lot.schema';
import { CarModel } from '../schemas/car.schema';
import { Car } from '../../../models/car';

@Injectable()
export class ParkingLotRepository {
  private parkingLot: ParkingLot;

  constructor(
    @InjectModel('ParkingLotModel')
    private parkingLotModel: Model<ParkingLotModel>,
    @InjectModel('CarModel')
    private carModel: Model<CarModel>,
  ) {}

  async get(): Promise<ParkingLot> {
    if (!this.parkingLot) {
      throw new ParkingLotNotExistsError();
    }
    return this.parkingLot;
  }

  async create(): Promise<ParkingLot> {
    if (this.parkingLot) {
      throw new ParkingLotHasBeenCreatedError();
    }
    this.parkingLot = new ParkingLot();
    return this.parkingLot;
  }

  async save(parkingLot: ParkingLot): Promise<void> {
    const c = [];
    parkingLot.slotMap.forEach((value: Car, key: number) => {
      c.push([key, value]);
    });
    const p = new this.parkingLotModel({
      slots: new Map([[1, null]]),
    });

    await p.save();
  }
}

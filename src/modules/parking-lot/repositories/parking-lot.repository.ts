import { Injectable } from '@nestjs/common';
import { ParkingLot } from '../../../models/parking-lot';
import { ParkingLotHasBeenCreatedError } from '../../../errors/parking-lot-has-been-created.error';
import { ParkingLotNotExistsError } from '../../../errors/parking-lot-not-exists.error';

@Injectable()
export class ParkingLotRepository {
  private parkingLot: ParkingLot;

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
}

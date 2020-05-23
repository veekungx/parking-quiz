import { Injectable } from '@nestjs/common';
import { CarSize, Car } from '../../../models/car';

@Injectable()
export class SlotRespository {
  private plateNumberByCarSizeMap = new Map();
  private slotByCarSizeMap = new Map();
  private carSlotMap = new Map();

  async initState(numOfSlots: number) {
    for (let i = 1; i <= numOfSlots; i++) {
      this.carSlotMap.set(i, null);
    }
    this.slotByCarSizeMap.set(CarSize.SMALL, []);
    this.slotByCarSizeMap.set(CarSize.MEDIUM, []);
    this.slotByCarSizeMap.set(CarSize.LARGE, []);

    this.plateNumberByCarSizeMap.set(CarSize.SMALL, []);
    this.plateNumberByCarSizeMap.set(CarSize.MEDIUM, []);
    this.plateNumberByCarSizeMap.set(CarSize.LARGE, []);
  }

  async addCarToSlot(slotId: number, car: Car): Promise<void> {
    this.carSlotMap.set(slotId, car);
    this.addPlateNumberByCarSize(car.getCarSize(), car.getPlateNumber());
    this.addSlotByCarSize(car.getCarSize(), slotId);
  }

  async removeCarFromSlot(slotId: number): Promise<void> {
    this.carSlotMap.set(slotId, null);
  }

  async getPlateNumberByCarSize(carSize: CarSize): Promise<string[]> {
    return this.plateNumberByCarSizeMap.get(carSize);
  }

  async getAllocatedSlotByCarSize(carSize: CarSize): Promise<number[]> {
    return this.slotByCarSizeMap.get(carSize);
  }

  private async addPlateNumberByCarSize(
    carSize: CarSize,
    plateNumber: string,
  ): Promise<void> {
    const pc = this.plateNumberByCarSizeMap.get(carSize);
    pc
      ? this.plateNumberByCarSizeMap.set(carSize, [...pc, plateNumber])
      : this.plateNumberByCarSizeMap.set(carSize, [plateNumber]);
  }

  private async addSlotByCarSize(
    carSize: CarSize,
    slotId: number,
  ): Promise<void> {
    const sc = this.slotByCarSizeMap.get(carSize);
    sc
      ? this.slotByCarSizeMap.set(carSize, [...sc, slotId])
      : this.slotByCarSizeMap.set(carSize, [slotId]);
  }
}

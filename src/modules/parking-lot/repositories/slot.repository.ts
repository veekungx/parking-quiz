import { Injectable } from '@nestjs/common';
import { CarSize, Car } from '../../../models/car';

@Injectable()
export class SlotRespository {
  private plateNumberByCarSizeMap = new Map();
  private slotByCarSizeMap = new Map();
  private carSlotMap = new Map();

  async addCarToSlot(slotId: number, car: Car): Promise<void> {
    this.carSlotMap.set(slotId, car);
  }

  async removeCarFromSlot(slotId: number): Promise<void> {
    this.carSlotMap.set(slotId, null);
  }

  async addPlateNumberByCarSize(
    carSize: CarSize,
    plateNumber: string,
  ): Promise<void> {
    const pc = this.plateNumberByCarSizeMap.get(carSize);
    pc
      ? this.plateNumberByCarSizeMap.set(carSize, [...pc, plateNumber])
      : this.plateNumberByCarSizeMap.set(carSize, [plateNumber]);
  }

  async addSlotByCarSize(carSize: CarSize, slotId: number): Promise<void> {
    const sc = this.slotByCarSizeMap.get(carSize);
    sc
      ? this.slotByCarSizeMap.set(carSize, [...sc, slotId])
      : this.slotByCarSizeMap.set(carSize, [slotId]);
  }

  async getPlateNumberByCarSize(carSize: CarSize): Promise<string[]> {
    return this.plateNumberByCarSizeMap.get(carSize);
  }

  async getAllocatedSlotByCarSize(carSize: CarSize): Promise<number[]> {
    return this.slotByCarSizeMap.get(carSize);
  }
}

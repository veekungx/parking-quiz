import { Injectable } from '@nestjs/common';
import { CarSize, Car } from '../../../models/car';

@Injectable()
export class SlotRespository {
  private plateNumberByCarSizeMap = new Map();
  private slotByCarSizeMap = new Map();
  private carSlotMap = new Map();

  constructor() {
    this.slotByCarSizeMap.set(CarSize.SMALL, []);
    this.slotByCarSizeMap.set(CarSize.MEDIUM, []);
    this.slotByCarSizeMap.set(CarSize.LARGE, []);

    this.plateNumberByCarSizeMap.set(CarSize.SMALL, []);
    this.plateNumberByCarSizeMap.set(CarSize.MEDIUM, []);
    this.plateNumberByCarSizeMap.set(CarSize.LARGE, []);
  }

  async initState(numOfSlots: number) {
    for (let i = 1; i <= numOfSlots; i++) {
      this.carSlotMap.set(i, null);
    }
  }

  async addCarToSlot(slotId: number, car: Car): Promise<void> {
    this.carSlotMap.set(slotId, car);
    this.addPlateNumberByCarSize(car.getCarSize(), car.getPlateNumber());
    this.addSlotByCarSize(car.getCarSize(), slotId);
  }

  async removeCarFromSlot(slotId: number): Promise<void> {
    const car: Car = this.carSlotMap.get(slotId);
    this.carSlotMap.set(slotId, null);

    this.removePlateNumberByCarSize(car.getCarSize(), car.getPlateNumber());
    this.removeSlotByCarSize(car.getCarSize(), slotId);
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

  private async removePlateNumberByCarSize(
    carSize: CarSize,
    plateNumber: string,
  ) {
    const pc = this.plateNumberByCarSizeMap.get(carSize);
    this.plateNumberByCarSizeMap.set(
      carSize,
      pc.filter(item => item !== plateNumber),
    );
  }

  private async removeSlotByCarSize(carSize: CarSize, slotId: number) {
    const sc = this.slotByCarSizeMap.get(carSize);
    this.slotByCarSizeMap.set(
      carSize,
      sc.filter(item => item !== slotId),
    );
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

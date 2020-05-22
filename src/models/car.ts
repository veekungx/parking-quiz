export enum CarSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export class Car {
  constructor(private plateNumber: string, private carSize: CarSize) {}

  getCarSize(): CarSize {
    return this.carSize;
  }

  getPlateNumber(): string {
    return this.plateNumber;
  }
}

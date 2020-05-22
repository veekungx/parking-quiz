export enum CarSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export class Car {
  constructor(private plateNumber: string, private size: CarSize) {}
}

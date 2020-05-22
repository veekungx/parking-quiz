enum CarSize {
  Small,
  Medium,
  Large,
}

export class Car {
  constructor(private plateNumber: string, private size: CarSize) {}
}

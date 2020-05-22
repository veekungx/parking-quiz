export class ParkingLotFullError extends Error {
  constructor(message?: string) {
    super(message); // (1)
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

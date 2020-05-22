import { ParkingLot } from './parking-lot';
import { CarSize, Car } from './car';

describe('ParkingLot', () => {
  describe('issueTicket()', () => {
    it('should throw error when parking slot is full', () => {
      const car1 = new Car('ABC-111', CarSize.SMALL);
      const car2 = new Car('ABC-222', CarSize.MEDIUM);
      const car3 = new Car('ABC-333', CarSize.LARGE);
      const car4 = new Car('ABC-444', CarSize.LARGE);
      const parkingLot = new ParkingLot();

      parkingLot.createParkingLot(3);

      parkingLot.issueTicket(car1);
      parkingLot.issueTicket(car2);
      parkingLot.issueTicket(car3);

      expect(() => {
        parkingLot.issueTicket(car4);
      }).toThrow(new Error('Parking full'));
    });
  });
});

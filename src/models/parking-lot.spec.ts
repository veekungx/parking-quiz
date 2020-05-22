import { ParkingLot } from './parking-lot';
import { CarSize, Car } from './car';
import { ParkingLotFullError } from '../errors/parking-lot-full.error';
import { InvalidSlotSizeError } from '../errors/invalid-slot-size.error';
import { Ticket } from './ticket';

describe('ParkingLot', () => {
  describe('createParkingLot()', () => {
    it('should throw InvalidSlotSizeError when number of slot is 0', () => {
      const parkingLot = new ParkingLot();
      expect(() => {
        parkingLot.createParkingLot(0);
      }).toThrowError(InvalidSlotSizeError);
    });

    it('should throw InvalidSlotSizeError when number is negative', () => {
      const parkingLot = new ParkingLot();
      expect(() => {
        parkingLot.createParkingLot(-10);
      }).toThrowError(InvalidSlotSizeError);
    });
  });

  describe('issueTicket()', () => {
    it('should return ticket when parking slot is available', () => {
      const car = new Car('AAA-111', CarSize.SMALL);
      const parkingLot = new ParkingLot();

      parkingLot.createParkingLot(3);
      const ticket: Ticket = parkingLot.issueTicket(car);

      expect(ticket.getCarSize()).toBe(CarSize.SMALL);
      expect(ticket.getPlateNumber()).toBe('AAA-111');
      expect(ticket.getSlotId()).toBe(1);
    });

    it('should throw ParkingLotFullError when parking slot is full', () => {
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
      }).toThrowError(ParkingLotFullError);
    });
  });
});

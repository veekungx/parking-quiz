import { Ticket, TicketInfo } from './ticket';
import { CarSize } from './car';

describe('Ticket', () => {
  describe('getInfo()', () => {
    it('should return ticket information', () => {
      const ticket = new Ticket('ABC-123', CarSize.MEDIUM, 1);
      const ticketInfo: TicketInfo = {
        plateNumber: 'ABC-123',
        carSize: CarSize.MEDIUM,
        slotId: 1,
      };
      expect(ticket.getInfo()).toEqual(ticketInfo);
    });
  });
  describe('getPlateNumber()', () => {
    it('should return plate number on that ticket', () => {
      const ticket = new Ticket('ABC-123', CarSize.MEDIUM, 1);
      expect(ticket.getPlateNumber()).toEqual('ABC-123');
    });
  });
  describe('getCarSize()', () => {
    it('should return car size on that ticket', () => {
      const ticket = new Ticket('ABC-123', CarSize.MEDIUM, 1);
      expect(ticket.getCarSize()).toEqual(CarSize.MEDIUM);
    });
  });
  describe('getSlotId()', () => {
    it('should return allocated slot on that ticket', () => {
      const ticket = new Ticket('ABC-123', CarSize.MEDIUM, 1);
      expect(ticket.getSlotId()).toEqual(1);
    });
  });
});

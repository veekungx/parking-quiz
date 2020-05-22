import { Car, CarSize } from './car';

describe('Car', () => {
  describe('Car.getPlateNumber()', () => {
    it('should retrive plateNumber', () => {
      const car = new Car('ABC-123', CarSize.LARGE);
      const actual = car.getPlateNumber();
      expect(actual).toEqual('ABC-123');
    });
  });

  describe('Car.getCarSize()', () => {
    it('should retrive carSize', () => {
      const car = new Car('ABC-123', CarSize.LARGE);
      const actual = car.getCarSize();

      expect(actual).toEqual(CarSize.LARGE);
    });
  });
});

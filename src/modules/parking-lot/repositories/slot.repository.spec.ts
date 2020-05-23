import { Test } from '@nestjs/testing';
import { SlotRespository } from './slot.repository';
import { CarSize, Car } from '../../../models/car';

describe.skip('SlotRepository', () => {
  let slotRepository;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SlotRespository],
    }).compile();

    slotRepository = moduleRef.get<SlotRespository>(SlotRespository);
  });

  describe('initState()', () => {
    it('should initialize state ', async () => {
      const numOfSlots = 100;
      await slotRepository.initState(numOfSlots);
    });
  });

  describe('addCarToSlot()', () => {
    it('should store car to specific slot', async () => {
      const slotId = 1;
      const car = new Car('ABC-111', CarSize.MEDIUM);
      await slotRepository.addCarToSlot(slotId, car);
    });
  });

  describe('removeCarFromSlot()', () => {
    it('should remove car from specific slot', async () => {
      const slotId = 1;
      await slotRepository.removeCarFromSlot(slotId);
    });
  });

  describe('getPlateNumberByCarSize()', () => {
    it('should retrieve all plate number by car size', async () => {
      await slotRepository.getPlateNumberByCarSize(CarSize.MEDIUM);
      // expect().toEqual();
    });
  });

  describe('getAllocatedSlotByCarSize()', () => {
    it('should retrieve all slot number by car size', async () => {
      await slotRepository.getAllocatedSlotByCarSize(CarSize.MEDIUM);
    });
  });
});

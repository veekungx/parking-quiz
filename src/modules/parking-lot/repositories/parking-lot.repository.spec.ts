import { Test } from '@nestjs/testing';
import { ParkingLotRepository } from './parking-lot.repository';
import { ParkingLotHasBeenCreatedError } from '../../../errors/parking-lot-has-been-created.error';
import { ParkingLotNotExistsError } from '../../../errors/parking-lot-not-exists.error';

describe('ParkingLotRepository', () => {
  let parkingLotRepository;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ParkingLotRepository],
    }).compile();

    parkingLotRepository = moduleRef.get<ParkingLotRepository>(
      ParkingLotRepository,
    );
  });

  describe('create', () => {
    it('should throw ParkingLotHasBeenCreatedError when parking lot already created', async () => {
      await parkingLotRepository.create();
      expect(parkingLotRepository.create()).rejects.toThrowError(
        ParkingLotHasBeenCreatedError,
      );
    });
  });

  describe('get', () => {
    it('should throw ParkingLotNotExistsError when parking lot does not create', async () => {
      expect(parkingLotRepository.get()).rejects.toThrowError(
        ParkingLotNotExistsError,
      );
    });
  });
});

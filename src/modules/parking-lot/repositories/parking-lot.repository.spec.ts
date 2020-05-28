import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ParkingLotRepository } from './parking-lot.repository';
import { ParkingLotHasBeenCreatedError } from '../../../errors/parking-lot-has-been-created.error';
import { ParkingLotNotExistsError } from '../../../errors/parking-lot-not-exists.error';

describe('ParkingLotRepository', () => {
  let parkingLotRepository;
  const parkingLotModel = {};
  const carModel = {};
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        // CqrsModule,
        // MongooseModule.forFeature([
        //   { name: ParkingLot.name, schema: ParkingLotSchema },
        // ]),
      ],
      providers: [
        ParkingLotRepository,
        {
          provide: getModelToken('ParkingLotModel'),
          useValue: parkingLotModel,
        },
        {
          provide: getModelToken('CarModel'),
          useValue: carModel,
        },
      ],
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

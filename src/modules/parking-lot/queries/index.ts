import { AllocatedSlotByCarSizeHandler } from './allocated-slot-by-car-size.handler';
import { PlateNumberByCarSizeHandler } from './plate-number-by-car-size.handler';
import { ParkingLotStatusHandler } from './parking-lot-status.handler';

export const ParkingLotQueryHandlers = [
  ParkingLotStatusHandler,
  AllocatedSlotByCarSizeHandler,
  PlateNumberByCarSizeHandler,
];

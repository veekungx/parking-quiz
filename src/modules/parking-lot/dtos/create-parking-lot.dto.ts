import { ApiProperty } from '@nestjs/swagger';

export class CreateParkingLotDto {
  @ApiProperty({ minimum: 1, default: 100 })
  numOfSlots: number;
}

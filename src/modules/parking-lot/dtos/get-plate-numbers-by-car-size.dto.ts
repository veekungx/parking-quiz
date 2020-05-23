import { CarSize } from '../../../models/car';
import { ApiProperty } from '@nestjs/swagger';

export class GetPlateNumbersByCarSizeDto {
  @ApiProperty({ required: true, enum: ['SMALL', 'MEDIUM', 'LARGE'] })
  carSize: CarSize;
}

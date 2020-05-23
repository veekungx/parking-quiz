import { CarSize } from '../../../models/car';
import { ApiProperty } from '@nestjs/swagger';

export class IssueTicketDto {
  @ApiProperty()
  plateNumber: string;

  @ApiProperty({ enum: ['SMALL', 'MEDIUM', 'LARGE'] })
  carSize: CarSize;
}

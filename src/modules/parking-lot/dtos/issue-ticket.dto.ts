import { CarSize } from '../../../models/car';
import { ApiProperty } from '@nestjs/swagger';

export class IssueTicketDto {
  @ApiProperty({ required: true })
  plateNumber: string;

  @ApiProperty({
    required: true,
    enum: ['SMALL', 'MEDIUM', 'LARGE'],
  })
  carSize: CarSize;
}

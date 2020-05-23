import { ApiProperty } from '@nestjs/swagger';

export class ReturnTicketDto {
  @ApiProperty({ required: true })
  slotId: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class ReturnTicketDto {
  @ApiProperty()
  slotId: number;
}

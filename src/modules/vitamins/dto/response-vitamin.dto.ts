import { ApiProperty } from '@nestjs/swagger';
import { CreateVitaminDto } from './create-vitamin.dto';

export class VitaminColumnsResponse extends CreateVitaminDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}

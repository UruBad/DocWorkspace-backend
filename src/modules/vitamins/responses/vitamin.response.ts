import { ApiProperty } from '@nestjs/swagger';
import { CreateVitaminDto } from '../dto';

export class VitaminResponse extends CreateVitaminDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}

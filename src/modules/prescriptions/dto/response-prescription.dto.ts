import { ApiProperty } from '@nestjs/swagger';
import { CreatePrescriptionDto } from './create-prescription.dto';

export class PrescriptionColumnsResponse extends CreatePrescriptionDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}

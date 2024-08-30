import { ApiProperty } from '@nestjs/swagger';
import { CreatePatientDto } from './create-patient.dto';

export class PatientColumnsResponse extends CreatePatientDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}

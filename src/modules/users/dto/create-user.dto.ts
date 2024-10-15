import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsEnum, IsNotEmpty } from 'class-validator';
import { ERole } from '../../../common';
import { CreatePatientDto } from './create-patient.dto';

export class CreateUserDto extends CreatePatientDto {
  @ApiProperty()
  @IsEnum(ERole)
  @IsNotEmpty()
  readonly role: ERole;

  @IsEmpty()
  readonly doctorId?: number;
}

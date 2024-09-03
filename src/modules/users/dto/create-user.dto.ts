import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../../../common';
import { CreatePatientDto } from './create-patient.dto';

export class CreateUserDto extends CreatePatientDto {
  @ApiProperty()
  @IsEnum(Role)
  @IsNotEmpty()
  readonly role: Role;

  @IsEmpty()
  readonly doctorId?: number;
}

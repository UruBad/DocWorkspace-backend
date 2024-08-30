import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../../../common';

export class CreatePrescriptionDto {
  @ApiProperty()
  @IsString()
  readonly breakfast: string;

  @ApiProperty()
  @IsString()
  readonly brunch: string;

  @ApiProperty()
  @IsString()
  readonly lunch: string;
}

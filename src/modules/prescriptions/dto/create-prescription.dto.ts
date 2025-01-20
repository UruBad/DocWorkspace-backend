import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EAppointment } from '../../../common';

export class CreatePrescriptionDto {
  @ApiProperty({ required: false })
  @IsEnum(EAppointment)
  @IsNotEmpty()
  readonly appointment: EAppointment;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly count: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @ApiProperty()
  @IsNumber()
  readonly patientId: number;

  @ApiProperty()
  @IsNumber()
  readonly vitaminId: number;
}

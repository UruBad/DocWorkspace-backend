import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePrescriptionDto {
  @ApiProperty()
  @IsString()
  readonly breakfast: string;

  @ApiProperty()
  @IsString()
  readonly lunch: string;

  @ApiProperty()
  @IsString()
  readonly dinner: string;

  @ApiProperty()
  @IsNumber()
  readonly patientId: number;

  @ApiProperty()
  @IsNumber()
  readonly vitaminId: number;
}

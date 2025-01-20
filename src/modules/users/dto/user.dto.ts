import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ERole } from '../../../common';

export class UserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: false })
  @IsEnum(ERole)
  @IsNotEmpty()
  readonly role: ERole;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  readonly doctorId?: number;
}

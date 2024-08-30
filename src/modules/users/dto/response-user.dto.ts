import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../common';
import { CreateUserDto } from './create-user.dto';

export class UserColumnsResponse extends CreateUserDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}

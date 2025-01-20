import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../dto';

export class UserResponse extends CreateUserDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}

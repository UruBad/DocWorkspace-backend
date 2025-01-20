import { UserResponse } from './user.response';
import { ApiProperty } from '@nestjs/swagger';
import { VitaminResponse } from '../../vitamins';

export class DoctorResponse extends UserResponse {
  @ApiProperty()
  readonly patients: UserResponse[];

  @ApiProperty()
  readonly vitamins: VitaminResponse[];
}

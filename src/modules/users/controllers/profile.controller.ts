import { Controller, UseGuards, Request, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserColumnsResponse } from '../dto';
import { UsersService } from '../services';
import { JwtAuthGuard, PayloadToken, RolesGuard } from '../../../common';

@ApiTags('profile')
@Controller('profile')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Мои данные' })
  @ApiResponse({
    status: 201,
    type: UserColumnsResponse,
  })
  @ApiBearerAuth('access-token')
  @Get()
  profile(@Request() req: { user: PayloadToken }) {
    return this.usersService.findById(req.user.id);
  }
}

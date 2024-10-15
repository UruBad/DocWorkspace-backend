import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateUserDto, UserColumnsResponse, UpdateUserDto } from '../dto';
import { UsersService } from '../services';
import {
  JwtAuthGuard,
  PayloadToken,
  Public,
  ERole,
  Roles,
  RolesGuard,
} from '../../../common';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: UserColumnsResponse,
  })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({
    status: 201,
    type: UserColumnsResponse,
  })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: UserColumnsResponse,
  })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Изменение пользователя' })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(+id, dto);
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UsersService } from '../services';
import { ERole, JwtAuthGuard, Roles, RolesGuard } from '../../../common';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { DoctorResponse } from '../responses';

@ApiTags('doctors')
@Controller('doctors')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DoctorsController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание врача' })
  @ApiResponse({
    status: 201,
    type: DoctorResponse,
  })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN, ERole.DOCTOR)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create({
      ...dto,
      role: ERole.DOCTOR,
    });
  }

  @ApiOperation({ summary: 'Получение врачей' })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: DoctorResponse,
  })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN)
  @Get()
  find() {
    return this.usersService.findDoctors();
  }

  @ApiOperation({ summary: 'Изменение врача' })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(+id, {
      ...dto,
      role: ERole.DOCTOR,
    });
  }

  @ApiOperation({ summary: 'Удаление врача' })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @ApiOperation({ summary: 'Обновление конкретных полей врача' })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN)
  @Patch(':id')
  patch(@Param('id') id: string, @Body() patchUserDto: any) {
    return this.usersService.patch(+id, patchUserDto);
  }
}

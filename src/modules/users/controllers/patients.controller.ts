import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UsersService } from '../services';
import {
  ERole,
  JwtAuthGuard,
  PayloadToken,
  Roles,
  RolesGuard,
} from '../../../common';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { PatientResponse } from '../responses';

@ApiTags('patients')
@Controller('patients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientsController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пациента' })
  @ApiResponse({
    status: 201,
    type: PatientResponse,
  })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN, ERole.DOCTOR)
  @Post()
  create(@Body() dto: CreateUserDto, @Request() req: { user: PayloadToken }) {
    return this.usersService.create({
      ...dto,
      role: ERole.PATIENT,
      doctorId: req.user.id,
    });
  }

  @ApiOperation({ summary: 'Получение пациента по идентификатору' })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN, ERole.DOCTOR)
  @Get(':id')
  patient(@Param('id') id: string, @Request() req: { user: PayloadToken }) {
    return this.usersService.findPatientById(+id, req.user.id);
  }

  @ApiOperation({ summary: 'Получение пациентов' })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: PatientResponse,
  })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN, ERole.DOCTOR)
  @Get()
  find(@Request() req: { user: PayloadToken }) {
    if (req.user.role === ERole.ADMIN) {
      return this.usersService.findPatients();
    }
    return this.usersService.findPatientsByDoctor(req.user.id);
  }

  @ApiOperation({ summary: 'Изменение пациента' })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN, ERole.DOCTOR)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @Request() req: { user: PayloadToken },
  ) {
    return this.usersService.update(+id, {
      ...dto,
      role: ERole.PATIENT,
      doctorId: req.user.id,
    });
  }

  @ApiOperation({ summary: 'Удаление пациента' })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN, ERole.DOCTOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @ApiOperation({ summary: 'Обновление конкретных полей пациента' })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN, ERole.DOCTOR)
  @Patch(':id')
  patch(@Param('id') id: string, @Body() patchUserDto: any) {
    return this.usersService.patch(+id, patchUserDto);
  }
}

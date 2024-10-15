import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

import {
  CreatePatientDto,
  PatientColumnsResponse,
  UpdatePatientDto,
} from '../dto';
import { UsersService } from '../services';
import { JwtAuthGuard, ERole, Roles, RolesGuard } from '../../../common';

@ApiTags('patients')
@Controller('patients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientsController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пациента' })
  @ApiResponse({
    status: 201,
    type: PatientColumnsResponse,
  })
  @ApiBearerAuth('access-token')
  @Roles(ERole.DOCTOR)
  @Post()
  create(@Body() dto: CreatePatientDto, @Request() { user }: any) {
    return this.usersService.create({
      ...dto,
      role: ERole.PATIENT,
      doctorId: user.id,
    });
  }

  @ApiOperation({ summary: 'Получение моих пациентов' })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: PatientColumnsResponse,
  })
  @ApiBearerAuth('access-token')
  @Roles(ERole.DOCTOR)
  @Get()
  my(@Request() { user }: any) {
    return this.usersService.findByDoctor(user.id);
  }

  @ApiOperation({ summary: 'Изменение пациента' })
  @ApiBearerAuth('access-token')
  @Roles(ERole.DOCTOR)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePatientDto) {
    return this.usersService.update(+id, dto);
  }

  @ApiOperation({ summary: 'Удаление пациента' })
  @ApiBearerAuth('access-token')
  @Roles(ERole.DOCTOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

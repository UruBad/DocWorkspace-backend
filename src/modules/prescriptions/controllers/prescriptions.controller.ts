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

import {
  CreatePrescriptionDto,
  PrescriptionColumnsResponse,
  UpdatePrescriptionDto,
} from '../dto';
import { ERole, JwtAuthGuard, Roles, RolesGuard } from '../../../common';
import { PrescriptionsService } from '../services';

@ApiTags('prescriptions')
@Controller('prescriptions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @ApiOperation({ summary: 'Создание назначения' })
  @ApiResponse({
    status: 201,
    type: PrescriptionColumnsResponse,
  })
  @Roles(ERole.ADMIN, ERole.DOCTOR)
  @Post()
  async create(@Body() dto: CreatePrescriptionDto, @Request() { user }: any) {
    return this.prescriptionsService.create(user.Id, dto);
  }

  @ApiOperation({ summary: 'Список назначений' })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: PrescriptionColumnsResponse,
  })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN, ERole.DOCTOR)
  @Get()
  find(@Param('patientId') patientId: string) {
    return this.prescriptionsService.find(+patientId);
  }

  @ApiOperation({ summary: 'Список назначений текущего пациентв' })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: PrescriptionColumnsResponse,
  })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN, ERole.PATIENT)
  @Get()
  my(@Request() { user }: any) {
    return this.prescriptionsService.find(+user.id);
  }

  @ApiOperation({ summary: 'Редактирование назначения' })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN, ERole.DOCTOR)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePrescriptionDto) {
    return this.prescriptionsService.update(+id, dto);
  }

  @ApiOperation({ summary: 'Удаление назначения' })
  @ApiBearerAuth('access-token')
  @Roles(ERole.DOCTOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prescriptionsService.remove(+id);
  }

  @ApiOperation({ summary: 'Обновление конкретных полей назначения' })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN, ERole.DOCTOR)
  @Patch(':id')
  patch(@Param('id') id: string, @Body() patchPrescriptionDto: any) {
    return this.prescriptionsService.patch(+id, patchPrescriptionDto);
  }
}

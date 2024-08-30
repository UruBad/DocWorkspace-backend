import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

import {
  CreatePrescriptionDto,
  UpdatePrescriptionDto,
  PrescriptionColumnsResponse,
} from '../dto';
import { JwtAuthGuard, Role, Roles, RolesGuard } from '../../../common';
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
  @Roles(Role.DOCTOR)
  @Post()
  create(@Body() dto: CreatePrescriptionDto) {
    return this.prescriptionsService.create(dto);
  }

  @ApiOperation({ summary: 'Список назначений' })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: PrescriptionColumnsResponse,
  })
  @ApiBearerAuth('access-token')
  @Roles(Role.DOCTOR)
  @Get()
  find(@Param('userId') userId: string) {
    return this.prescriptionsService.find(+userId);
  }

  @ApiOperation({ summary: 'Редактирование назначения' })
  @ApiBearerAuth('access-token')
  @Roles(Role.DOCTOR)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePrescriptionDto) {
    return this.prescriptionsService.update(+id, dto);
  }

  @ApiOperation({ summary: 'Удаление назначения' })
  @ApiBearerAuth('access-token')
  @Roles(Role.DOCTOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prescriptionsService.remove(+id);
  }
}

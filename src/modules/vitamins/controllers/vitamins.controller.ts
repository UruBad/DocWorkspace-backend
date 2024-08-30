import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  CreateVitaminDto,
  VitaminColumnsResponse,
  UpdateVitaminDto,
} from '../dto';
import { VitaminsService } from '../services';
import { JwtAuthGuard, Role, Roles, RolesGuard } from '../../../common';

@ApiTags('vitamins')
@Controller('vitamins')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VitaminsController {
  constructor(private readonly vitaminsService: VitaminsService) {}

  @ApiOperation({ summary: 'Создание витамина' })
  @ApiResponse({
    status: 201,
    type: VitaminColumnsResponse,
  })
  @Roles(Role.DOCTOR)
  @Post()
  create(@Body() createVitaminDto: CreateVitaminDto) {
    return this.vitaminsService.create(createVitaminDto);
  }

  @ApiOperation({ summary: 'Список всех доступных витаминов' })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: VitaminColumnsResponse,
  })
  @ApiBearerAuth('access-token')
  @Roles(Role.DOCTOR)
  @Get()
  find() {
    return this.vitaminsService.find();
  }

  @ApiOperation({ summary: 'Список всех витаминов' })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: VitaminColumnsResponse,
  })
  @ApiBearerAuth('access-token')
  @Roles(Role.DOCTOR)
  @Get()
  findAll() {
    return this.vitaminsService.findAll();
  }

  @ApiOperation({ summary: 'Поиск витамина по идентификатору' })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: VitaminColumnsResponse,
  })
  @ApiBearerAuth('access-token')
  @Roles(Role.DOCTOR)
  @Get()
  findById(@Param('id') id: string) {
    return this.vitaminsService.findById(+id, 1);
  }

  @ApiOperation({ summary: 'Редактирование витамина' })
  @ApiBearerAuth('access-token')
  @Roles(Role.DOCTOR)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVitaminDto: UpdateVitaminDto) {
    return this.vitaminsService.update(+id, updateVitaminDto);
  }

  @ApiOperation({ summary: 'Удаление витамина' })
  @ApiBearerAuth('access-token')
  @Roles(Role.DOCTOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vitaminsService.remove(+id);
  }
}

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

import { CreateVitaminDto, UpdateVitaminDto, VitaminResponse } from '../dto';
import { VitaminsService } from '../services';
import {
  ERole,
  JwtAuthGuard,
  PayloadToken,
  Roles,
  RolesGuard,
} from '../../../common';

@ApiTags('vitamins')
@Controller('vitamins')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VitaminsController {
  constructor(private readonly vitaminsService: VitaminsService) {}

  @ApiOperation({ summary: 'Список всех витаминов' })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: VitaminResponse,
  })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN, ERole.DOCTOR)
  @Get()
  findAll(@Request() req: { user: PayloadToken }) {
    if (req.user.role === ERole.ADMIN) {
      return this.vitaminsService.findAll();
    } else {
      return this.vitaminsService.find(+req.user.id);
    }
  }

  @ApiOperation({ summary: 'Поиск витамина по идентификатору' })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: VitaminResponse,
  })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN, ERole.DOCTOR)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.vitaminsService.findById(+id, 1);
  }

  @ApiOperation({ summary: 'Создание витамина' })
  @ApiResponse({
    status: 201,
    type: VitaminResponse,
  })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN, ERole.DOCTOR)
  @Post()
  create(
    @Request() req: { user: PayloadToken },
    @Body() createVitaminDto: CreateVitaminDto,
  ) {
    return this.vitaminsService.create(createVitaminDto, req.user.id);
  }

  @ApiOperation({ summary: 'Редактирование витамина' })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN, ERole.DOCTOR)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateVitaminDto: UpdateVitaminDto) {
    return this.vitaminsService.update(+id, updateVitaminDto);
  }

  @ApiOperation({ summary: 'Удаление витамина' })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN, ERole.DOCTOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vitaminsService.remove(+id);
  }

  @ApiOperation({ summary: 'Обновление конкретных полей витамина' })
  @ApiBearerAuth('access-token')
  @Roles(ERole.ADMIN, ERole.DOCTOR)
  @Patch(':id')
  patch(@Param('id') id: string, @Body() patchVitaminDto: any) {
    return this.vitaminsService.patch(+id, patchVitaminDto);
  }
}

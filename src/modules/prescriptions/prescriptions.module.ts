import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth';
import { PrescriptionsController } from './controllers';
import { Prescription } from './entities';
import { PrescriptionsService } from './services';
import { VitaminsModule } from '../vitamins';
import { UsersModule } from '../users';

@Module({
  imports: [
    VitaminsModule,
    UsersModule,
    TypeOrmModule.forFeature([Prescription]),
  ],
  controllers: [PrescriptionsController],
  providers: [PrescriptionsService, JwtStrategy],
  exports: [PrescriptionsService],
})
export class PrescriptionsModule {}

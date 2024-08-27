import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/';
import { Vitamin } from './entities';
import { VitaminsService } from './services';
import { VitaminsController } from './controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Vitamin])],
  controllers: [VitaminsController],
  providers: [VitaminsService, JwtStrategy],
  exports: [VitaminsService],
})
export class VitaminsModule {}

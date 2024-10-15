import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth';
import {
  PatientsController,
  ProfileController,
  UsersController,
} from './controllers';
import { User, DoctorPatient } from './entities';
import { DoctorPatientService, UsersService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([User, DoctorPatient])],
  controllers: [UsersController, PatientsController, ProfileController],
  providers: [UsersService, DoctorPatientService, JwtStrategy],
  exports: [UsersService, DoctorPatientService],
})
export class UsersModule {}

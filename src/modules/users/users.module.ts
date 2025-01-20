import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth';
import {
  DoctorsController,
  PatientsController,
  ProfileController,
} from './controllers';
import { DoctorPatient, User } from './entities';
import { DoctorPatientService, UsersService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([User, DoctorPatient])],
  controllers: [DoctorsController, PatientsController, ProfileController],
  providers: [UsersService, DoctorPatientService, JwtStrategy],
  exports: [UsersService, DoctorPatientService],
})
export class UsersModule {}

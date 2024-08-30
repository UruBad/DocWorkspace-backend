import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorPatient } from '../entities';

@Injectable()
export class DoctorPatientService {
  constructor(
    @InjectRepository(DoctorPatient)
    private doctorPatientRepository: Repository<DoctorPatient>,
  ) {}

  async find(doctorId: number, patientId: number) {
    return await this.doctorPatientRepository.findOneByOrFail({
      doctor: { id: doctorId },
      patient: { id: patientId },
    });
  }
}

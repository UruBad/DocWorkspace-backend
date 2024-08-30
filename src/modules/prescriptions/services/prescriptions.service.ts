import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePrescriptionDto, UpdatePrescriptionDto } from '../dto';
import { Prescription } from '../entities';
import { DoctorPatientService } from '../../users/services';
import { VitaminsService } from '../../vitamins/services';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
    private readonly vitaminsService: VitaminsService,
    private readonly doctorPatientService: DoctorPatientService,
  ) {}

  async create(doctorId: number, dto: CreatePrescriptionDto) {
    const vitamin = await this.vitaminsService.findById(
      dto.vitaminId,
      doctorId,
    );

    if (!vitamin) {
      throw new NotFoundException(`Vitamin with id ${dto.vitaminId} not found`);
    }

    const doctorPatient = await this.doctorPatientService.find(
      doctorId,
      dto.patientId,
    );

    if (!doctorPatient) {
      throw new NotFoundException(`Patient with id ${dto.patientId} not found`);
    }

    const created = this.prescriptionRepository.create({
      ...dto,
      doctorPatient: {
        id: doctorPatient.id,
      },
      vitamin: { id: dto.vitaminId },
    });
    const saved = await this.prescriptionRepository.save(created);
    return saved;
  }

  async find(id: number) {
    return this.prescriptionRepository.findBy({
      doctorPatient: { patient: { id } },
    });
  }

  async update(id: number, dto: UpdatePrescriptionDto) {
    const item = await this.prescriptionRepository.preload({
      id,
      ...dto,
    });
    if (!item) {
      throw new NotFoundException(`Prescription with id ${id} does not exist`);
    }
    return this.prescriptionRepository.save(item);
  }

  async remove(id: number) {
    const item = await this.prescriptionRepository.findOneByOrFail({ id });

    if (!item) {
      throw new NotFoundException(`Prescription with id ${id} does not exist`);
    }

    return this.prescriptionRepository.remove(item);
  }
}

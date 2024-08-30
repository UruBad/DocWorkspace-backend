import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePrescriptionDto, UpdatePrescriptionDto } from '../dto';
import { Prescription } from '../entities';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectRepository(Prescription)
    private prescriptionRepository: Repository<Prescription>,
  ) {}

  async create(dto: CreatePrescriptionDto) {
    const created = await this.prescriptionRepository.create(dto);
    const saved = await this.prescriptionRepository.save(created);
    return saved;
  }

  async find(userId: number) {
    return this.prescriptionRepository.findBy({
      // doctorPatient: { id: userId },
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

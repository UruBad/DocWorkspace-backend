import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVitaminDto, UpdateVitaminDto } from '../dto';
import { Vitamin } from '../entities';

@Injectable()
export class VitaminsService {
  constructor(
    @InjectRepository(Vitamin)
    private vitaminRepository: Repository<Vitamin>,
  ) {}

  async create(dto: CreateVitaminDto) {
    const created = this.vitaminRepository.create(dto);
    const saved = await this.vitaminRepository.save(created);
    return saved;
  }

  async find() {
    return this.vitaminRepository.findBy({ deleted: false });
  }

  async findAll() {
    return this.vitaminRepository.find();
  }

  async findById(id: number, doctorId: number) {
    return await this.vitaminRepository.findOneByOrFail({
      id,
      doctor: { id: doctorId },
      deleted: false,
    });
  }

  async update(id: number, dto: UpdateVitaminDto) {
    const item = await this.vitaminRepository.preload({
      id,
      ...dto,
    });
    if (!item) {
      throw new NotFoundException(`Vitamin with id ${id} does not exist`);
    }
    return this.vitaminRepository.save(item);
  }

  async remove(id: number) {
    const item = await this.vitaminRepository.findOneByOrFail({ id });

    if (!item) {
      throw new NotFoundException(`Vitamin with id ${id} does not exist`);
    }

    return this.vitaminRepository.remove(item);
  }
}

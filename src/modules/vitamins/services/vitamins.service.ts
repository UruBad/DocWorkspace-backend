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

  async create(createVitaminDto: CreateVitaminDto) {
    const createdVitamin = await this.vitaminRepository.create(
      createVitaminDto,
    );
    const saveVitamin = await this.vitaminRepository.save(createdVitamin);
    return saveVitamin;
  }

  async find() {
    return this.vitaminRepository.findBy({ deleted: false });
  }

  async findAll() {
    return this.vitaminRepository.find();
  }

  async findById(id: number) {
    return await this.vitaminRepository.findOneByOrFail({ id, deleted: false });
  }

  async update(id: number, updateVitaminDto: UpdateVitaminDto) {
    const vitamin = await this.vitaminRepository.preload({
      id,
      ...updateVitaminDto,
    });
    if (!vitamin) {
      throw new NotFoundException(`Vitamin with id ${id} does not exist`);
    }
    return this.vitaminRepository.save(vitamin);
  }

  async remove(id: number) {
    const vitamin = await this.vitaminRepository.findOneByOrFail({ id });

    if (!vitamin) {
      throw new NotFoundException(`Vitamin with id ${id} does not exist`);
    }

    return this.vitaminRepository.remove(vitamin);
  }
}

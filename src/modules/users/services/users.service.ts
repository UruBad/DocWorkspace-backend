import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { createHash } from 'crypto';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { User } from '../entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.findOneBy({
      username: dto.username,
    });

    if (user) {
      throw new BadRequestException();
    }

    const created = this.userRepository.create({
      ...dto,
    });
    const saved = await this.userRepository.save(created);
    delete saved.password;
    delete saved.refreshToken;
    return saved;
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findById(id: number) {
    return await this.userRepository.findOneByOrFail({ id });
  }

  async findByDoctor(id: number) {
    return await this.userRepository.findBy({ id });
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOneOrFail({
      where: { username },
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    const item = await this.userRepository.preload({
      id,
      ...dto,
    });
    if (!item) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }
    return this.userRepository.save(item);
  }

  async remove(id: number) {
    const item = await this.userRepository.findOneByOrFail({ id });

    if (!item) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }

    return this.userRepository.remove(item);
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const hash = createHash('sha256').update(refreshToken).digest('hex');

    const currentHashedRefreshToken = await bcrypt.hashSync(hash, 10);
    return await this.userRepository.update(userId, {
      refreshToken: currentHashedRefreshToken,
    });
  }

  async removeRefreshToken(id: number) {
    await this.findById(id);

    return this.userRepository.update(
      { id: id },
      {
        refreshToken: null,
      },
    );
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, id: number) {
    const user = await this.userRepository.findOne({
      select: ['id', 'refreshToken', 'role'],
      where: { id },
    });

    const hash = createHash('sha256').update(refreshToken).digest('hex');
    const isRefreshTokenMatching = await bcrypt.compare(
      hash,
      user.refreshToken,
    );

    if (isRefreshTokenMatching) {
      return { id: user.id, role: user.role };
    }
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { createHash } from 'crypto';
import { Repository } from 'typeorm';
import { UserDto } from '../dto';
import { DoctorPatient, User } from '../entities';
import { ERole } from '../../../common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(DoctorPatient)
    private doctorPatientRepository: Repository<DoctorPatient>,
  ) {}

  async create(dto: UserDto) {
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

    if (dto.doctorId) {
      const createdDoctorPatient = this.doctorPatientRepository.create({
        patient: { id: saved.id },
        doctor: { id: dto.doctorId },
      });
      await this.doctorPatientRepository.save(createdDoctorPatient);
    }

    return saved;
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findById(id: number) {
    return await this.userRepository.findOneByOrFail({ id });
  }

  async findPatientById(id: number, doctorId: number) {
    return await this.userRepository.findOneByOrFail({
      id,
      doctors: { id: doctorId },
    });
  }

  async findPatients() {
    return await this.userRepository.findBy({ role: ERole.PATIENT });
  }

  async findDoctors() {
    return await this.userRepository.findBy({ role: ERole.DOCTOR });
    /* return await this.userRepository.find({
      relations: ['patients', 'vitamins'] {
        // patients: true,
        vitamins: true,
      },
      where: { role: ERole.DOCTOR },
      loadEagerRelations: false,
    }); */
  }

  async findPatientsByDoctor(id: number) {
    return await this.userRepository.findBy({
      doctors: { id },
      role: ERole.PATIENT,
    });
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOneOrFail({
      select: ['id', 'password', 'role'],
      where: { username },
    });
  }

  async update(id: number, dto: UserDto) {
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

    return this.update(id, { ...item, deleted: true });
  }

  async patch(id: number, dto: any) {
    const item = await this.userRepository.findOneByOrFail({ id });

    if (!item) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }

    return this.update(id, { ...item, ...dto });
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

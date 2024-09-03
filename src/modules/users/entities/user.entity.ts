import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { DefaultEntity, Role } from '../../../common';
import { Vitamin } from '../../vitamins/entities';
import { DoctorPatient } from './doctor-patient.entity';

@Entity('users')
export class User extends DefaultEntity {
  @Column()
  lastname: string;

  @Column()
  firstname: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ select: false, nullable: true, name: 'refresh_token' })
  refreshToken: string;

  @Column({ select: false, default: false })
  deleted: boolean;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.PATIENT,
  })
  role: Role;

  @OneToMany(() => Vitamin, (vitamin) => vitamin.doctor)
  vitamins: Vitamin[];

  @OneToMany(() => DoctorPatient, (doctorPatient) => doctorPatient.doctor)
  doctors: User[];

  @OneToMany(() => DoctorPatient, (doctorPatient) => doctorPatient.patient)
  patients: User[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}

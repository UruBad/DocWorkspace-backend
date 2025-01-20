import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { DefaultEntity, EGender, ERole } from '../../../common';
import { Vitamin } from '../../vitamins/entities';
import { DoctorPatient } from './doctor-patient.entity';

@Entity('users')
export class User extends DefaultEntity {
  @Column()
  lastname: string;

  @Column()
  firstname: string;

  @Column()
  avatar: string;

  @Column({
    type: 'enum',
    enum: EGender,
    default: EGender.MALE,
  })
  gender: EGender;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false, nullable: true, name: 'refresh_token' })
  refreshToken: string;

  @Column({ default: false })
  deleted: boolean;

  @Column({
    type: 'enum',
    enum: ERole,
    default: ERole.PATIENT,
  })
  role: ERole;

  @OneToMany(() => Vitamin, (vitamin) => vitamin.doctor)
  vitamins: Vitamin[];

  @OneToMany(() => DoctorPatient, (doctorPatient) => doctorPatient.patient)
  doctors: User[];

  @OneToMany(() => DoctorPatient, (doctorPatient) => doctorPatient.doctor)
  patients: User[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}

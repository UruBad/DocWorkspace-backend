import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from '../../../common';
import { User } from './user.entity';
import { Prescription } from '../../prescriptions/entities';

@Entity('doctor-patient')
export class DoctorPatient extends DefaultEntity {
  @ManyToOne(() => User, (user) => user.doctors)
  doctor: User;

  @ManyToOne(() => User, (user) => user.patients)
  patient: User;

  @OneToMany(() => Prescription, (prescription) => prescription.doctorPatient)
  prescriptions: Prescription[];

  @Column({ select: false, default: false })
  deleted: boolean;
}

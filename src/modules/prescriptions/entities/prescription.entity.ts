import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from '../../../common';
import { Vitamin } from '../../vitamins/entities';
import { DoctorPatient } from '../../users/entities';

@Entity('prescriptions')
export class Prescription extends DefaultEntity {
  @Column({ select: false, nullable: true })
  breakfast: string;

  @Column({ select: false, nullable: true })
  brunch: string;

  @Column({ select: false, nullable: true })
  lunch: string;

  @ManyToOne(() => Vitamin, (vitamin) => vitamin.prescriptions, { eager: true })
  vitamin: Vitamin;

  @ManyToOne(
    () => DoctorPatient,
    (doctorPatient) => doctorPatient.prescriptions,
    {
      eager: true,
    },
  )
  doctorPatient: DoctorPatient;
}

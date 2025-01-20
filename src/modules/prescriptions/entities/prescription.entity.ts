import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity, EAppointment } from '../../../common';
import { Vitamin } from '../../vitamins/entities';
import { DoctorPatient } from '../../users/entities';

@Entity('prescriptions')
export class Prescription extends DefaultEntity {
  @Column({
    type: 'enum',
    enum: EAppointment,
    default: EAppointment.BREAKFAST,
  })
  appointment: EAppointment;

  @Column({ nullable: false })
  count: number;

  @Column({ nullable: false })
  type: string;

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

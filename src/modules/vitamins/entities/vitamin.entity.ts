import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from '../../../common';
import { User } from '../../users/entities/user.entity';
import { Prescription } from '../../prescriptions/entities';

@Entity('vitamins')
export class Vitamin extends DefaultEntity {
  @Column({ unique: true })
  name: string;

  @Column({ select: false, nullable: true })
  description: string;

  @Column({ unique: false, nullable: true })
  image: string;

  @Column({ select: false, nullable: true })
  link: string;

  @Column({ select: false, default: false })
  deleted: boolean;

  @ManyToOne(() => User, (user) => user.vitamins, { eager: true })
  doctor: User;

  @OneToMany(() => Prescription, (prescription) => prescription.vitamin)
  prescriptions: Prescription[];
}

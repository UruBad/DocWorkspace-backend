import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from '../../../common';
import { User } from '../../users';
import { Prescription } from '../../prescriptions';

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

  /* @ManyToOne(() => User, (user) => user.vitamins, { eager: true })
  user: User; */

  /* @OneToMany(() => Prescription, (prescription) => prescription.vitamin)
  prescriptions: Prescription[]; */
}

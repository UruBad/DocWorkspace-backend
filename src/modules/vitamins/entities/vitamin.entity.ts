import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from '../../../common';
import { User } from '../../users/entities/user.entity';
import { Prescription } from '../../prescriptions/entities';

@Entity('vitamins')
export class Vitamin extends DefaultEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  image: string;

  @Column()
  link: string;

  @Column({ default: false })
  deleted: boolean;

  @ManyToOne(() => User, (user) => user.vitamins, { eager: true })
  doctor: User;

  @OneToMany(() => Prescription, (prescription) => prescription.vitamin)
  prescriptions: Prescription[];
}

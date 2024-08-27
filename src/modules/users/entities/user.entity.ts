import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { DefaultEntity, Role } from '../../../common';
import { Vitamin } from '../../vitamins';

@Entity('users')
export class User extends DefaultEntity {
  @Column({ unique: true })
  username: string;

  @Column({ select: false })
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

  @OneToMany(() => Vitamin, (vitamin) => vitamin.user)
  vitamins: Vitamin[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}

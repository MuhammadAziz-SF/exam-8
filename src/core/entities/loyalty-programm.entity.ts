import { enums } from 'src/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './users.entity';

@Entity({ name: 'loyalty_program' })
export class LoyaltyProgramEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'integer', default: 0 })
  points: number;

  @Column({
    type: 'enum',
    enum: enums.loyalty_levels,
    default: enums.loyalty_levels.BRONZE,
  })
  level: enums.loyalty_levels;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => UserEntity, (u) => u.loyaltyProgram, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}

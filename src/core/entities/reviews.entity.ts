import { enums } from 'src/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FlightsEntity } from './flights.entity';
import { TicketsEntity } from './tickets.entity';
import { UserEntity } from './users.entity';

@Entity({ name: 'users' })
export class ReviewsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'varchar' })
  flightId: string;

  @Column({ type: 'integer' })
  rating: number;

  @Column({ type: 'varchar' })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (u) => u.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToOne(() => FlightsEntity, (f) => f.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'flightId' })
  flight: FlightsEntity;
}

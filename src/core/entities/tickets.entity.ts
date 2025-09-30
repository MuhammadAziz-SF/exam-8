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
import { LoyaltyProgramEntity } from './loyalty-programm.entity';
import { NewsEntity } from './news.entity';
import { FlightsEntity } from './flights.entity';
import { UserEntity } from './users.entity';
import { SeatsEntity } from './seats.entity';
import { PaymentsEntity } from './payments.entity';

@Entity({ name: 'users' })
export class TicketsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'varchar' })
  flightId: string;

  @Column({ type: 'varchar' })
  seatId: string;

  @Column({ type: 'varchar' })
  bookingReference: string;

  @Column({
    type: 'enum',
    enum: enums.ticket_status,
    default: enums.ticket_status.PENDING,
  })
  status: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'varchar' })
  currency: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => UserEntity, (u) => u.ticket, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => FlightsEntity, (f) => f.ticket, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'flightId' })
  flight: FlightsEntity;

  @OneToOne(() => SeatsEntity, (s) => s.ticket, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'seatId' })
  seat: SeatsEntity;

  @OneToOne(() => PaymentsEntity, (p) => p.ticket, { cascade: true })
  payment: TicketsEntity;
}

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlanesEntity } from './planes.entity';
import { ClassesEntity } from './classes.entity';
import { TicketsEntity } from './tickets.entity';

@Entity({ name: 'seats' })
export class SeatsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  planeId: string;

  @Column({ type: 'varchar' })
  seatNumber: string;

  @Column({ type: 'varchar', nullable: true })
  classId: string;

  @ManyToOne(() => PlanesEntity, (p) => p.seats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'planeId' })
  plane: PlanesEntity;

  @ManyToOne(() => ClassesEntity, (c) => c.seats, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'classId' })
  class: ClassesEntity;

  @OneToOne(() => TicketsEntity, (t) => t.seat, { cascade: true })
  ticket: TicketsEntity;
}

import { enums } from 'src/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Timestamp } from 'typeorm/browser';
import { PlanesEntity } from '../entities/planes.entity';
import { AirportsEntity } from '../entities/airports.entity';
import { UserEntity } from '../entities/users.entity';
import { TicketsEntity } from './tickets.entity';
import { ReviewsEntity } from './reviews.entity';

@Entity({ name: 'flights' })
export class FlightsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  flightNumber: number;

  @Column({ type: 'varchar' })
  planeId: string;

  @Column({ type: 'varchar' })
  departureAirport: string;

  @Column({ type: 'varchar' })
  arrivalAirport: string;

  @Column({ type: 'timestamp' })
  departureTime: Timestamp;

  @Column({ type: 'timestamp' })
  arrivalTime: Timestamp;

  @Column({ type: 'uuid', nullable: true })
  createdBy: string;

  @Column({ type: 'uuid', nullable: true })
  updatedBy: string;

  @Column({ type: 'enum', enum: enums.flight_status })
  status: enums.flight_status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => PlanesEntity, (p) => p.flights, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'planeId' })
  plane: PlanesEntity;

  @ManyToOne(() => AirportsEntity, (a) => a.depFlights, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'departureAirport' })
  depAirport: AirportsEntity;

  @ManyToOne(() => AirportsEntity, (a) => a.arFlights, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'arrivalAirport' })
  arAirport: AirportsEntity;

  @ManyToOne(() => UserEntity, (u) => u.createdflights, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'createdBy' })
  byCreated: UserEntity;

  @ManyToOne(() => UserEntity, (u) => u.updatedflights, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'updatedBy' })
  byUpdated: UserEntity;

  @OneToMany(() => TicketsEntity, (t) => t.flight, { cascade: true })
  tickets: TicketsEntity[];

  @OneToMany(() => ReviewsEntity, (review) => review.flight)
  reviews: ReviewsEntity[];
}

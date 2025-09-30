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
import { CitiesEntity } from './cities.entity';
import { FlightsEntity } from './flights.entity';

@Entity({ name: 'airports' })
export class AirportsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  cityId: string;

  @Column({ type: 'varchar' })
  code: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => CitiesEntity, (c) => c.airports, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cityId' })
  city: CitiesEntity;

  @OneToMany(() => FlightsEntity, (f) => f.depAirport, { cascade: true })
  depFlights: FlightsEntity;

  @OneToMany(() => FlightsEntity, (f) => f.arAirport, { cascade: true })
  arFlights: FlightsEntity;
}

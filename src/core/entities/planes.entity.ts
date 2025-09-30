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
import { CompaniesEntity } from './companies.entity';
import { SeatsEntity } from './seats.entity';
import { FlightsEntity } from './flights.entity';

@Entity({ name: 'planes' })
export class PlanesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  model: string;

  @Column({ type: 'integer' })
  capacity: number;

  @Column({ type: 'varchar' })
  companyId: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => CompaniesEntity, (company) => company.planes, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'companyId' })
  company: CompaniesEntity;

  @OneToMany(() => SeatsEntity, (s) => s.plane, { cascade: true })
  seats: SeatsEntity[];

  @OneToMany(() => FlightsEntity, (f) => f.plane, { cascade: true })
  flights: FlightsEntity[];
}

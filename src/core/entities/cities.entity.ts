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
import { CountriesEntity } from './countries.entity';
import { AirportsEntity } from './airports.entity';

@Entity({ name: 'cities' })
export class CitiesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'uuid', nullable: true })
  countryId: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => CountriesEntity, (country) => country.cities, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'countryId' })
  country: CountriesEntity;

  @OneToMany(() => AirportsEntity, (a) => a.city, { cascade: true })
  airports: AirportsEntity;
}
